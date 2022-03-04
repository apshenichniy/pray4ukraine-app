import styles from './Story.module.scss';

function Story() {
  return (
    <div className={styles.Story}>
      <div className={styles.content}>
        <div className={styles.title}>
          Story Behind This Project
        </div>
        <div className={styles.subtitle}>
          February 24th, at 5 a.m
        </div>
        <div className={styles.description}>
          On February 24th, at 5 a.m., all Ukrainians&apos; lives were divided into &quot;before&quot; and &quot;after.&quot; The Russian invasion made the whole Ukraine live in shelters, under the signals of sirens, under inhuman bombardments, and fires in their homeland. The War in Ukraine has been called the largest military conflict in Europe since World War II. This War is not only about Ukraine, it has affected the safety of the entire world.
        </div>
        <div className={styles.subtitleAndImage}>
          <div className={styles.subtitle}>
            Ukraine needs EVERYONE’s help
          </div>
          <img
            src='/images/heart-mobile.svg'
            className={styles.mobileImage}/>
        </div>
        <div className={styles.description}>
          You can make a donation! We are more than 30 Ukrainians, and we cannot stand aside, while our home is on fire. We are launching an NFT-project where Everyone can contribute to ending this war. Everyone can help to restore the lives of civilians. Help Ukraine rise from the ashes!
        </div>
        <div className={styles.subtitle}>
          All funds to the War victims
        </div>
        <div className={styles.description}>
          All the money will go to the charity <a href='https://savelife.in.ua/'>https://savelife.in.ua/</a>, the biggest Ukrainian charity foundation, and will only be used for peaceful purposes in Ukraine, to support the Ukrainian army and the victims.
        </div>
        <img
          src='/images/heart-left.svg'
          className={styles.leftImage} />
        <img
          src='/images/heart-right.svg'
          className={styles.rightImage} />
      </div>
    </div>
  );
}

export default Story;