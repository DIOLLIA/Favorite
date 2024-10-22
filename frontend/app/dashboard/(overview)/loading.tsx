import DashboardSkeleton from '@/app/ui/skeletons';
// bcz it's on high level to the customers/page.tsx and invoices/page.tsx - it's also applied to those pages.
export default function Loading() {
    return <DashboardSkeleton />;
}