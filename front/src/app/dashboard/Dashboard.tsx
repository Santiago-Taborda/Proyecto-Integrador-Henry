import DashboardClient from "@/components/DashboardClient";
import RouteProtect from "@/components/RouteProtect";

const Dashboard = async () => {
  return (
    <RouteProtect>
      <div className="padding">
        <DashboardClient />
      </div>
    </RouteProtect>
  );
};

export default Dashboard;
