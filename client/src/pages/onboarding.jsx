import Image from "next/image";
import React, { useState } from "react";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import { useStateProvider } from "@/context/StateContext";

const onboarding = () => {
  const [{ userInfo }] = useStateProvider();

  const [about, setAbout] = useState("");
  const [name, setName] = useState(userInfo?.name || "");
  const [image, setImage] = useState("/default_avatar.png");

  const onboardUserHandler = async () => {
    if(validateDetails) {
      const email = userInfo.email;

      try {
        
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  const validateDetails = () => {
    if(name.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="Whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>

      <h2 className="text-2xl">Create your profile</h2>

      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          {/* {userInfo.name} */}
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          
          <div className="flex items-center justify-center">
            <button 
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>

        </div>

        <div>
          <Avatar type="xl" image={image} setImage={setImage}/>
        </div>
      </div>

    </div>
  );
}

export default onboarding;
