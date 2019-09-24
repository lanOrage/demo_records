import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

export default class Record extends Component{
    state={
        ifEdit:false
    }
    // 这里面我们接收从父组件传来的状态消息，用做显示
    static propTypes={
        record : PropTypes.object.isRequired,
        id:PropTypes.string.isRequired,
        deleteRecord:PropTypes.func.isRequired,
        sendEdit:PropTypes.func.isRequired
    }
    deleteItem=(event)=>{
        // console.log(event.target.id)
        const id=event.target.id;
        if(window.confirm("确定删除此项记录吗？")){
            // 调用函数修改状态，删除此记录
            this.props.deleteRecord(id)
        }
    }
    editItemToggle=()=>{//此时要编辑修改内容，那么要变成可更改的input。
        const edit=this.state.ifEdit;
        this.setState({ifEdit:!edit})
    }
    recordRow=()=>{
        const{ date, goods, price }=this.props.record;
        return (
            <tr>
                <td>{date}</td>
                <td>{goods}</td>
                <td>{price}</td>
                <td className="td_del_btn">
                    <button className="btn btn-primary edit" id={this.props.id} onClick={this.editItemToggle}>编辑</button>
                    <button className="btn btn-primary delete" id={this.props.id} onClick={this.deleteItem}>删除</button>
                </td>
             </tr>
        )
    }
    recordForm=()=>{
        const{ date, goods, price }=this.props.record;
        return (
            <tr>
                <td className="edit_input">
                    <input type="text" className="form-control edit_form" defaultValue={date} ref="date"/>
                </td>
                <td  className="edit_input">
                    <input type="text" className="form-control edit_form" defaultValue={goods} ref="goods"/>
                </td>
                <td  className="edit_input">
                    <input type="text" className="form-control edit_form" defaultValue={price} ref="price"/>
                </td>
                <td className="td_edit_btn">
                    <button className="btn btn-primary confirm" id={this.props.id} onClick={this.confirmUpdate}>确认</button>
                    <button className="btn btn-primary cancel" id={this.props.id} onClick={this.editItemToggle}>取消</button>
                </td>
            </tr>
        )
    }

    confirmUpdate=async (event)=>{
        const id=event.target.id;
        const date=this.refs.date.value;
        const goods=this.refs.goods.value;
        const price=this.refs.price.value;
        var response = await axios.put("http://localhost:3000/records/"+id,{
                                id,
                                date,
                                goods, 
                                price
                            })
        console.log(response.data)//可以得到修改后的记录
        const ifEdit=this.state.ifEdit;
        this.setState({ifEdit:!ifEdit})
        // 并且传递记录修改后的状态重新渲染页面
        this.props.sendEdit({
            date,
            goods, 
            price,
            id,
        })
        
    }
    render(){
        if(this.state.ifEdit){
            return this.recordForm()
        }else{
            return this.recordRow()
        }
    }
}

// 也可以，试过了，没错
/*
    axios({
            method: 'put',
            url:"http://localhost:3000/records/"+id,
            data: {
                id,
                date,
                goods, 
                price
            }
        })
*/ 