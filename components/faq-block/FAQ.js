import styles from './FAQ.module.scss';
import { faq } from './faq.const';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';

const mobileFAQ = faq.reduce((result, column) => [...result, ...column], []);
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: '#fffdfa',
  border: 'none',
  '&:not(:last-child)': {
    marginBottom: '16px',
  },
}));

function FAQ(props) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.FAQ}>
      <div ref={props.innerRef} className={styles.FAQAnchor}></div>
      <div className={styles.title}>
        Frequently Asked Questions
      </div>
      <div className={styles.content}>
        {
          faq.map((column, index) => 
            <div key={index} className={styles.column}>
              {
                column.map((item, itemIndex) => 
                  <div key={itemIndex} className={styles.panel}>
                    <div className={styles.panelTitle}>
                      {item.title}
                    </div>
                    <div className={styles.panelDescription}>
                      {item.description}
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
      <div className={styles.mobileContent}>
        {
          mobileFAQ.map((item, index) => 
            <Accordion
              expanded={expanded === 'panel' + index}
              key={index}
              onChange={handleChange('panel' + index)}>
              <AccordionSummary
                expandIcon={
                  expanded === 'panel' + index
                    ? <img src='/images/minus-icon.svg'/>
                    : <img src='/images/plus-icon.svg'/>
                }
                aria-controls={'panel' + index + '-content'}
                id={'panel' + index + '-header'}>
                <div className={styles.mobilePanelTitle}>
                  {item.title}
                </div>
              </AccordionSummary>
              <AccordionDetails>
               <div className={styles.panelDescription}>
                  {item.description}
                </div>
              </AccordionDetails>
            </Accordion>
          )
        }
      </div>
    </div>
  );
}

export default FAQ;