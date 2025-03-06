import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = async() => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/ventureVaultLogo.png" alt="Logo" width={190} height={20}/>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
            <Link href="/startup/create">
            <span className="max-sm:hidden">Create</span>
            <BadgePlus className="size-6 sm:hidden" />
            </Link>

            <form action={async()=>{
              'use server';
              await signOut({redirectTo:'/'}); 
            }}>
              <button> 

            <span className="max-sm:hidden">Logout</span>
            <LogOut className="size-6 sm:hidden text-red-500" />
              
              </button>
           
            </form>

            <Link href = {`/user/${session?.id}`}>
            <Avatar className="size-10">
              <AvatarImage src={session?.user?.image} alt={session?.user?.name || ''} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            </Link>
            </>
          ):
         ( 
         <>
            <form action={async()=> {
              'use server';
              await signIn('github')
              }
              }>
                <button type='submit'>
                  <span>Log In</span>
                 </button>
              
            </form>         
          </>
          )
        }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
