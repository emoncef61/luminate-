//react Nextjs
import {FC} from "react"
import Image from "next/image"

//logo Img
import LogoImg from '../../../public/assets/icons/logo.svg'


interface LogoProps{
    width: string;
    height: string;
}

const Logo:FC<LogoProps>=({width, height})=>{
    return <div className="z-50" style={{ width, height}}>
        <Image
        src= {LogoImg}
        alt="Luminate"
        className="w-full h-full object-contain overflow-visible"
        />
    </div>;
};

export default Logo;