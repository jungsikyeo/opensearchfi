/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Footer.module.css";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { FaDiscord, FaLinkedinIn, FaTwitter } from "react-icons/fa";
export default function Footer() {
  const open = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <p className={styles.credit}>
        Powered by{" "}
        <a
          href="https://dribbble.com/shots/19328654-NFT-Marketplace-Website"
          target="_blank"
          rel="noreferrer"
        >
          EunhoPapa
        </a>{" "}
      </p>
      <div className={styles.socials}>
        <span>
          <FaDiscord
            className={styles.icon}
            onClick={() => open("https://discord.gg/searchfi")}
          />
          <AiFillGithub
            className={styles.icon}
            onClick={() => open("https://github.com/jungsikyeo")}
          />
          <FaTwitter
            className={styles.icon}
            onClick={() => open("https://twitter.com/kakaossam")}
          />
          <AiFillInstagram
            className={styles.icon}
            onClick={() => open("https://www.instagram.com/1985yjs/")}
          />
        </span>
        <a href="https://searchfi.io/" target="_blank" rel="noreferrer">
          searchfi.io
        </a>
      </div>
      <div className={styles.logo}>
        <img src="/searchfi-main-logo.png" alt="logo" />
        <h2>OpenSearchFi</h2>
      </div>
    </div>
  );
}
