import Link from "next/link";
import React from "react";

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <h2>Amirmfth CRM</h2>
        <Link href={"/add-customer"}>Add Customer</Link>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <a href="https://amir-m-fatahi.vercel.app" target="_blank" rel="noreferrer">Amirmfth </a>| CRM Project
        &copy;
      </footer>
    </>
  );
}

export default Layout;
