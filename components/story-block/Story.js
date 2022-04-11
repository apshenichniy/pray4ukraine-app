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
            About The Project
          </div>
          <div className={styles.description}>
            Pray4Ukraine is a charitable project developed to mobilize the crypto-community around the world to support Ukraine. The beating heart of this project is the artists. The project brought together 1100 digital artists from Ukraine and other corners of the world, each with a personal story directly influenced by the war. Amplifying their voices and spreading their vision is one of the priorities of Pray4Ukraine. A blend of classic art and modern technology is a powerful tool. The Pray4Ukraine artists created a collection of 10,000 NFT art pieces thematically spinning around the ongoing struggle for freedom and democracy in Ukraine.Pray4Ukraine is a product of a partnership with the Come Back Alive foundation. The foundation has been on the humanitarian frontline since May 2014. Come Back Alive adheres to its principle of providing life-saving assistance. This includes life-preserving equipment for the Ukrainian defenders, medical care and rehabilitation for veterans, training, etc. Together we can end this war and save countless lives in Ukraine. Crypto community, it is time to mint and help Ukraine!
          </div> 
          <div className={styles.subtitle}>
            Story Behind This Project: February 24th, at 5 a.m
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