import React, { Component } from 'react'
import {Card,Carousel} from 'antd'
import './ui.less'
export default class carousel extends Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-warp">
                        {/* 	是否自动切换  动画效果*/}
                    <Carousel autoplay effect="fade">
                        <div>
                            <h3>Ant Motion Banner - react</h3>
                        </div>
                        <div>
                            <h3>Ant Motion hhhr - react</h3>
                        </div>
                        <div>
                            <h3>Ant Motion Buuuner - react</h3>
                        </div>
                    </Carousel>
                </Card>

                <Card title="图片轮播" className="slider-warp">
                        {/* 	是否自动切换  动画效果*/}
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""/>    
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
