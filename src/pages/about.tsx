import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import IUser from 'src/interfaces/user'
import Layout from 'src/components/Layout/Layout'
import { GetStaticProps } from 'next'
import { Image } from 'src/components/ui-kits/CustomImage'
import styles from '../styles/pages/about.module.scss'
import classNames from 'classnames'
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import endpoint from "../utils/endpoints";

interface AboutProps {
  userInfo: IUser;
}

const About: React.FC<AboutProps> = ({ userInfo = null }): JSX.Element => {
  
  return (
    <>
      <Layout>
        <div className={styles['about-container']}>
            <p className={classNames(styles['about-container__title'], styles['margin-bot-10'])}>
                Introduce about Xốp365
            </p>
            <div className={styles['about-container__content']}>
                <p><strong>Xốp365</strong> is founded in 2021 by Nguyen Thanh Hoang in California, USA</p>
                <p>This is the shop which focus on selling mordern cars.
                We supplied many cars for many types: business, traveling, camping...
                Our parnerts are famous and popular in manufacturing cars such as 
                BWM, Maseratti, McLaren, Bugatti and Lamnorghini, etc...</p>
                
                <p>We bring to you the best services to have your dream car in a very fast time with 
                short of procedural problems.
                Let have experience with us and you will never disapointed</p>
            </div>
            <hr className={styles['about-container__content--divider']} /> 
            <p className={classNames(styles['about-container__title'])}>
                Terms and Conditions
            </p>
            <p>Last updated: June 09, 2021</p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            
            <div className={styles['about-container__content']}>
                <p className={classNames(styles['about-container__content--policy'])}>Termination</p>
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                <p>Upon termination, Your right to use the Service will cease immediately.</p>

                <p className={classNames(styles['about-container__content--policy'])}>Governing Law</p>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>

                <p className={classNames(styles['about-container__content--policy'])}>Disputes Resolution</p>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>

                <p className={classNames(styles['about-container__content--policy'])}>Changes to These Terms and Conditions</p>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
                <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>

                <p className={classNames(styles['about-container__content--policy'])}>Contact Us</p>
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul className={styles['about-container__content--contact-list']}>
                    <li>By phone number: 1(844) 428-5645</li>
                    <li>Main Office: 868 Meadowbrook St.Parlin, NJ 08859, California, USA</li>
                    <li>Fax number: +1-212-9876543</li>
                    <li>Zip code: 90011</li>
                </ul>

            </div>
            {/* <hr className={styles['about-container__content--divider']} />  */}

        </div>
        
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const client = new ApolloClient({
    uri: "http://localhost:2021/api/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
    query Product {
      products {
        name
        price
      }
    }
    `,
  })
  console.log('data', data);
  
  return {
    props: {}
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.storage.userInfo,
})

export default connect(mapStateToProps)(About)
