'use server'

import {z} from 'zod'
import {sql} from "@/app/seed/route"
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, {message: 'Please enter an amount greater than 0.'}),
    status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.'}),
    date: z.string()
})

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const dashInv = '/dashboard/invoices'

const CreateInvoice = FormSchema.omit({id: true, date: true})
const UpdateInvoice = FormSchema.omit({id: true, date: true}) // Validating the types with Zod

export async function updateInvoice(id: string, prevState: State, formData: FormData) { // Extracting the data from formData
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }
    const {customerId, amount, status} = validatedFields.data
    const amountInCents = amount * 100

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId},
                amount      = ${amountInCents},
                status      = ${status},
                WHERE id = ${id}`
    } catch (error){
        return {
            message: 'DB: failed to create Invoice. Cause: ', error
        }
    }

    revalidatePath(dashInv); // to clear the client cache and make a new server request.
    redirect(dashInv)
}
//todo use prevState to save correct values and not drop them (see how it realized in edit when it returns previous value)
export async function createInvoice(prevState: State, formData: FormData) { //prevState contains the state passed from the useActionState
    // const rawFormData = CreateInvoice.parse({
    const validatedFields = CreateInvoice.safeParse({ //safeParse() will return an object containing either a success or error field. This will help handle validation more gracefully without having put this logic inside the try/catch block.
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    const  {customerId, amount, status} = validatedFields.data
    const amountInCents = amount * 100
    const date = new Date().toISOString().split("T")[0]

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    }
    catch (error){
        return {
            message : 'DB: failed to create Invoice. Cause: ', error
        }
    }
    revalidatePath(dashInv);
    redirect(dashInv)
}

export async function deleteInvoice(id: string) {
    try {
    await sql`DELETE
              FROM invoices
              WHERE id = ${id}`;
    }
    catch (error){
        return{
            message: 'DB: failed to create Invoice Cause: ', error
        }
    }
    revalidatePath(dashInv)
    return {message: `invoice ${id} successfully deleted`}
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}