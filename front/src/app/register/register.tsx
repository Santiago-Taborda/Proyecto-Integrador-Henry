import RegisterForm from "@/components/RegisterForm";
import RegisterProtect from "@/components/RegisterProtect";

const register = () => {
  return (
    <RegisterProtect>
      <div className="padding">
        <RegisterForm />
      </div>
    </RegisterProtect>
  );
};

export default register;
