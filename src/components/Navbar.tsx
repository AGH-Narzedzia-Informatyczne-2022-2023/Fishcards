import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Navbar() {
    return (
        <div className="navbar bg-base-100 max-w-5xl m-auto">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" href={"/"}> Fishcards </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><Link href={"/groups"}>Groups</Link></li>
                <li tabIndex={0}>
                    <a>
                    Decks
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </a>
                    <ul className="p-2 bg-base-100 z-50">
                    <li><Link href={"/decks"}>My decks</Link></li>
                    <li><Link href={"/official"}>Official decks</Link></li>
                    </ul>
                </li>
                <li><button onClick={ () => signOut() }>Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;