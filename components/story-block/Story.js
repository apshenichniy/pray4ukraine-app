import React from 'react';
import styles from './Story.module.scss';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { scrollY, innerHeight } = window;
      this.setState({
        scrollOffset: Math.max(((scrollY - 300) / innerHeight) * 100, 0),
      })
    })
  }

  render() {
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
            All the money will go to the charity <a href='http://www.comebackalive.in.ua/' target='_blank' rel='noreferrer'>http://www.comebackalive.in.ua/</a>, the biggest Ukrainian charity foundation, and will only be used for peaceful purposes in Ukraine, to support the Ukrainian army and the victims.
          </div>
          <img
            src='/images/heart-left.svg'
            style={{ transform: 'translateX(-100%) translateY(' + (-1 * (this.state.scrollOffset || 0)) + '%)'}}
            className={styles.leftImage} />
          <img
            src='/images/heart-right.svg'
            style={{ transform: 'translateY(' + (-1 * (this.state.scrollOffset || 0)) + '%)'}}
            className={styles.rightImage} />
        </div>
      </div>
    );
  }
}

export default Story;