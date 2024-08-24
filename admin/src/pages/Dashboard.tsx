import Reservations from "../components/Reservations";
import MetricCard from "../components/ui/MetricCard";

const Dashboard = () => {
  return (
    <div className="overflow-auto">
      <div className="flex w-full justify-between gap-5 px-4 pb-4">
        <MetricCard className="bg-orange-500 text-foreground" title="New Books" value="12 803" />
        <MetricCard className="bg-rose-500 text-foreground" title="New Users" value="3 113" />
        <MetricCard
          className="bg-emerald-500 text-foreground"
          title="Burrows this month"
          value="14 223"
        />
      </div>
      <Reservations />
    </div>
  );
};

export default Dashboard;
