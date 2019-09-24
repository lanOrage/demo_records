import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { Button, WhiteSpace, WingBlank } from 'antd-mobile';//如果我要引入的话

import '../../css/index.css'

export default class RecordsForm extends Component{
    //格式化一下我们创建的日期：
    formatDate = ()=>{
        var now=new Date(Date.now())
        var today={
            year:now.getFullYear(),
            month:now.getMonth(),
            day:now.getDate()
        }
        return `${today.year}-${today.month+1}-${today.day}`
    }
    state={
        date:"",
        goods:"",
        price:""
    }
    static propTypes={
        addItem:PropTypes.func.isRequired
    }
    addItemInfo=()=>{
        // 得到输入的数据，写到账单中
        var {date,goods,price}=this.state;
        // 记录到后台数据库(假装，这样下次打开依然存在
        axios({
            method: 'post',
            url:"http://localhost:3000/records",
            data: {
                date,
                goods, 
                price
            }
        })
        // 1.点击按钮，运行此函数，发送数据给隔壁的组件，就得调用函数
        this.props.addItem({date,goods,price});
        this.setState({
            date:"",
            goods:"",
            price:""
        })
    }
    
    focusIn=(event)=>{
        if(event.target.id==="date"){
            this.setState({date:this.formatDate()})
        }else if(event.target.id==="price"){
            this.setState({price:"￥"})
        }
    }
    changeInfo=(event)=>{
        var val=event.target.value;
        var name=event.target.id;
        var newstate={[name]:val};
        this.setState(Object.assign(this.state,newstate))
    }
    isOk=()=>{
        return this.state.date && this.state.goods && this.state.price
    }
    render(){
        const {date,goods,price}=this.state
        return (
            <div className="form">
                <form>
                    <div className="form-group">
                        {/* 
                        Label与for属性有一个冲突的地方，
                        因为使用JSX，这个属性会被转换成一个JavaScript对象，且作为第一个参数传递给组件的构造器，
                        但由于for属于JavaScript的一个保留字，所以我们无法把它作为一个对象的属性。
                        在React中，与class变成了className类似，for也变成了htmlFor 
                        */}
                        <label htmlFor="date" className='form-title'>日期</label>
                        <input type="text" className="form-control input" value={date} onChange={this.changeInfo} onFocus={this.focusIn} id="date" placeholder="请输入消费日期"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="goods" className='form-title'>消费记录</label>
                        <input type="text" className="form-control input" value={goods} onChange={this.changeInfo} id="goods" placeholder="请输入消费物品"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className='form-title'>价格</label>
                        <input type="text" className="form-control input" value={price} onChange={this.changeInfo} onFocus={this.focusIn} id="price" placeholder="请输入消费价格"/>
                    </div>
                </form>
                <button className="btn btn-info" onClick={this.addItemInfo} disabled={!this.isOk()}>添加记录</button>
                {/* <Button type="primary" inline style={{ color: 'white' ,position:'absolute',right: '0px',}}>添加记录</Button> */}
            </div>
        )
    }
}