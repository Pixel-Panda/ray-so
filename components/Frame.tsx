import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useContext } from "react";

import { fileNameAtom, showBackgroundAtom } from "../store";
import { FrameContext } from "../store/FrameContextStore";
import { paddingAtom } from "../store/padding";
import { THEMES, darkModeAtom, themeAtom, themeBackgroundAtom } from "../store/themes";
import useIsSafari from "../util/useIsSafari";

import Editor from "./Editor";
import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";

import styles from "../styles/Frame.module.css";
import { selectedLanguageAtom } from "../store/code";
import Image from "next/image";

import beams from "../assets/beams.jpg";

const VercelFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.vercelFrame,
        showBackground && !darkMode && styles.vercelFrameLightMode,
        !showBackground && styles.noBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.vercelWindow}>
        <span className={styles.vercelGridlinesHorizontal} data-grid></span>
        <span className={styles.vercelGridlinesVertical} data-grid></span>
        <span className={styles.vercelBracketLeft} data-grid></span>
        <span className={styles.vercelBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

const SupabaseFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.supabaseFrame,
        !darkMode && styles.supabaseFrameLightMode,
        !showBackground && styles.noBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div className={styles.supabaseWindow}>
        <div className={styles.supabaseHeader}>
          <div className={classNames(styles.fileName, styles.supabaseFileName)} data-value={fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
              size={1}
            />
            {fileName.length === 0 ? <span>Untitled-1</span> : null}
          </div>
          <span className={styles.supabaseLanguage}>{selectedLanguage?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const TailwindFrame = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        styles.frame,
        showBackground && styles.tailwindFrame,
        !darkMode && styles.tailwindFrameLightMode,
        !showBackground && styles.noBackground
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      {showBackground && <img src={beams.src} alt="beams" className={styles.tailwindBeams} />}
      <div className={styles.tailwindWindow}>
        {showBackground && (
          <>
            <span className={styles.tailwindGridlinesHorizontal} data-grid></span>
            <span className={styles.tailwindGridlinesVertical} data-grid></span>
            <div className={styles.tailwindGradient}>
              <div>
                <div className={styles.tailwindGradient1}></div>
                <div className={styles.tailwindGradient2}></div>
              </div>
            </div>
          </>
        )}
        <div className={styles.tailwindHeader}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const DefaultFrame = () => {
  const [padding] = useAtom(paddingAtom);
  const isSafari = useIsSafari();
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);
  const [themeBackground] = useAtom(themeBackgroundAtom);

  return (
    <div className={styles.frame} style={{ padding, backgroundImage: showBackground ? themeBackground : `` }}>
      {!showBackground && <div data-ignore-in-export className={styles.transparentPattern}></div>}
      <div
        className={classNames(styles.window, {
          [styles.withBorder]: !isSafari,
          [styles.withShadow]: !isSafari && showBackground,
        })}
      >
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              spellCheck={false}
              tabIndex={-1}
            />
            {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const Frame = () => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);

  return (
    <div className={styles.frameContainer}>
      <ResizableFrame>
        <FlashMessage />
        <div className={styles.outerFrame} ref={frameContext}>
          {[THEMES.vercel.id, THEMES.rabbit.id].includes(theme.id) ? (
            <VercelFrame />
          ) : THEMES.supabase.id === theme.id ? (
            <SupabaseFrame />
          ) : THEMES.tailwind.id === theme.id ? (
            <TailwindFrame />
          ) : (
            <DefaultFrame />
          )}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
