// src/components/Navbar.tsx

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link href="/tags">Tags</Link></li>
        <li><Link href="/characters">Characters</Link></li>
        <li><Link href="/ratings">Ratings</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  navList: {
    color: "white",
    listStyleType: "none",
    display: "flex",
    gap: "20px",
  }
};

export default Navbar;
