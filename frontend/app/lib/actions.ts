'use server'

import {z} from 'zod'
import {sql} from "@/app/seed/route"
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const dashInv = '/dashboard/invoices'

const CreateInvoice = FormSchema.omit({id: true, date: true})
const UpdateInvoice = FormSchema.omit({id: true, date: true}) // Validating the types with Zod

export async function updateInvoice(id: string, formData: FormData) { // Extracting the data from formData
    const {customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

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

export async function createInvoice(formData: FormData) {
    // const rawFormData = CreateInvoice.parse({
    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    const amountInCents = amount * 100
    const date = new Date().toISOString().split("T")[0]
    // console.log(rawFormData);
    console.log(amountInCents, " ", date);

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
    throw new Error('Failed to Delete Invoice');
/*
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
    return {message: `invoice ${id} successfully deleted`}*/
}