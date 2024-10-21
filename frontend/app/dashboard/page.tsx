// This is how you can create different pages in Next.js: create a new route segment using a folder, and add a page file inside it.
import {Card} from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {lui} from '@/app/ui/fonts';
import {fetchRevenue, fetchLatestInvoices, fetchCardData} from "@/app/lib/data";

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices()
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices
    } = await fetchCardData()
    return (
        <main>
            <h1 className={`${lui.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                 <Card title="Collected" value={totalPaidInvoices} type="collected" />
                 <Card title="Pending" value={totalPendingInvoices} type="pending" />
                 <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                { <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> }
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue}/>
                <LatestInvoices latestInvoices={latestInvoices} dd={7}/>
            </div>
        </main>
    );
}
