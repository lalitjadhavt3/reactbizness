import React from 'react'
import styles from '../styles/pricing.module.css'
import CustomButton from '../components/CustomButton'

const Pricing = () => {
 const card = [
  {
   id: 1,
   title: 'Smart Business Card',
   price: '149',
   list1: 'Single Nfc Smart Card',
   list2: 'QR code Sticker',
   list3: 'User Manual',
   list4: 'Verified Biznesstag Profile',
   list5: '24/7 support',
   backgroundColor: '#ffba00',
  },
  {
   id: 2,
   title: 'Business Card + Stand',
   price: '249',
   list1: 'Single Nfc Smart Card',
   list2: 'Single QR code Stand',
   list3: 'QR code Sticker',
   list4: 'User Manual',
   list5: 'Verified Biznesstag Profile',
   list6: '24/7 support',
   backgroundColor: '#FF0000',
  },
  {
   id: 3,
   title: 'Business QR Code Stand',
   price: '159',
   list1: 'Business QR Code Stand',
   list2: 'QR code Sticker',
   list3: 'User Manual',
   list4: 'Verified Biznesstag Profile',
   list5: '24/7 support',
   backgroundColor: '#00AFFF',
  },
 ]

 return (
  <>
   <div className={styles.container}>
    <img
     src='https://biznesstag.com/wp-content/uploads/2023/01/biznesstag-logo-768x205.png'
     alt='Biznesstag Logo'
     className={styles.pricingimg}
    />
   </div>
   <div className={styles.pricingtitle}>
    <p className={styles.titletext}>Pricing Packages</p>
   </div>
   <div className={styles.cardcontainer}>
    {card.map((i, index) => {
     return (
      <div key={i.id} className={`${styles.card} ${index === 1 ? styles.middleCard : ''}`}>
       <div className={styles.header}>
        <span className={styles.title}>{i.title}</span>
       </div>
       <div className={styles.pricebox}>
        <span className={styles.price}>
         <span className={styles.rupeesicon}>₹</span>
         {i.price}
         <span className={styles.rupeestext}>/One Time</span>
        </span>
       </div>
       <div className={styles.listbox}>
        <ul className={styles.lists}>
         <li className={styles.list}>
          <span>{i.list1}</span>
         </li>
         <li className={styles.list}>
          <span>{i.list2}</span>
         </li>
         <li className={styles.list}>
          <span>{i.list3}</span>
         </li>
         <li className={styles.list}>
          <span>{i.list4}</span>
         </li>
         <li className={styles.list}>
          <span>{i.list5}</span>
         </li>
         {i.list6 && (
          <li className={styles.list}>
           <span>{i.list6}</span>
          </li>
         )}
        </ul>
       </div>
       <div>
        <button
         type='button'
         className={styles.action}
         style={{backgroundColor: i.backgroundColor}}
        >
         CHOOSE PLAN
        </button>
       </div>
      </div>
     )
    })}
   </div>

   <div className={styles.pricefooter}>
    <div className={styles.footerimg}>
     <img
      src='https://biznesstag.com/wp-content/uploads/2023/01/biznesstag-logo-768x205.png'
      alt=''
     />
    </div>
    <div className={styles.footertext}>
     <p>Office - College Road , Patil Presidency, 1st Floor , Nashik</p>
    </div>
    <div className={styles.footertext}>
     <p>Email- Support@biznesstag.com Call-8010892552</p>
    </div>
    <div className={styles.footerbtn}>
     <CustomButton
      btnText={'Visit Profile'}
      // logoIcon={<FaEye />}
      iconPosition={'start'}
     />
    </div>
   </div>
   <div className={styles.endfooter}>
    <div className={styles.bottom}>
     <p>© Copyright - Bizness Shelter</p>
    </div>
   </div>
  </>
 )
}

export default Pricing
