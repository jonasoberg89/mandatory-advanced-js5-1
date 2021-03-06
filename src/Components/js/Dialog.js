import React, { useState } from 'react';
import styles from '../css/Dialog.module.css';
import { Dropbox } from 'dropbox';
import { token$ } from '../../Store';

const Dialog = (props) => {
  const [folderName, setFolderName] = useState("");

  function handleFolderName(e) {
    setFolderName(e.target.value);
  }

  function handleNewFolder() {
    let dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesCreateFolderV2({ path: props.currentPath + "/" + folderName})
    .then(()=> props.exitDialog());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.Dialog}>
        <div className={styles.Dialog__header}>
          <div className={styles['Dialog__header-left']}>
            <i className={`material-icons ${styles['Dialog__header-icon']}`}>folder</i>
            <span className={styles['Dialog__header-text']}>Create New Folder</span>
          </div>
          <div className={styles['Dialog__header-right']}>
            <i onClick={props.exitDialog} className={`material-icons ${styles['Dialog__header-close']}`}>close</i>
          </div>
        </div>
        <div className={styles.Dialog__content}>
          <span className={styles['Dialog__content-text']} >Give this folder a name</span>
          <input onChange={handleFolderName} value={folderName} type="text" className={styles['Dialog__content-input']} placeholder="Folder Name..." />
        </div>
        <div className={styles.Dialog__footer}>
          <button onClick={props.exitDialog} className={styles['Dialog__footer-cancel']}>Cancel</button>
          <button onClick={handleNewFolder} className={styles['Dialog__footer-create']}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default Dialog;
