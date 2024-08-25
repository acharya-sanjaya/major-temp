import {cn} from "../../utils/cn";

interface MetricCardProps {
  title: string;
  value: string;
  className?: string;
}

const MetricCard = ({title, value, className}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground border-2 border-primary-foreground hover:shadow-lg hover:shadow-primary rounded-xl transition-colors duration-1000 font-mono min-w-[250px] cursor-pointer",
        className
      )}
    >
      <div className="text-3xl pl-10 pr-24 py-5 text-left font-bold">{title}</div>
      <div className="font-bold text-2xl pr-5 py-5 text-right">{value}</div>
    </div>
  );
};

export default MetricCard;
