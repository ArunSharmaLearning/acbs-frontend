import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import carouselEx from '../../assets/carouselEx.jpg'
import "./Executive.css"

function Card(props) {
    const history = useNavigate();
    const page= props.page;


    props = props?.data
    return (
        <main onClick={()=>history.push(`/news/${props?.id}/${props?.slug}`)} className='executive-outer'>
            <section className = "executive-image" style={{backgroundImage:`url(${carouselEx})`}}>
            </section>
            <section className="executive-content">
            <h6>President</h6>
            <h5> dfk dfpd f</h5>
            <div className='icons'>
                <FacebookIcon/>
                <InstagramIcon/>
                <MailOutlineIcon/>
            </div>
            </section>
        </main>
    );
}

export default Card;