
import './index.scss'
import {useEffect} from "react";
import * as React from "react";

const LazyImg = () =>{
        useEffect(() =>{
            const imgList = [...document.querySelectorAll('img')];
            let io = new IntersectionObserver((entries) =>{
                entries.forEach(item =>{
                    if(item.isIntersecting) {
                        console.log(item.target);
                        item.target.src=item.target.dataset.src;
                        io.unobserve(item.target);
                    }
                })
            }, {
                root: document.querySelector('.root')
            })
            imgList.forEach(img => io.observe(img));
        }, [])


        return (
            <div>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu1.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu2.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu3.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu4.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/ao1.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/ao2.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/ao3.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/ao1.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu1.jpg'}/>
            <img data-src={process.env.PUBLIC_URL + 'img/my/wu2.jpg'}/>
        </div>
)
}

export default LazyImg;
