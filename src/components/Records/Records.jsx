import React from 'react'
import PropTypes from 'prop-types'

import Record from './Record'
import '../../css/index.css'

export default class Records extends React.Component{ 
    static propTypes={
        records:PropTypes.array.isRequired,
        deleteRecord:PropTypes.func.isRequired,
        sendEdit:PropTypes.func.isRequired,
    }
    totalPrice=()=>{
        // 得到所有物品的金额，累加
        var allPrice=[]
        this.props.records.map((record)=>{
            // console.log(typeof record.price === "string");
            allPrice.push(+record.price.slice(1))
            
        })
        // console.log(allPrice)
        return allPrice.reduce((sum,recordprice)=>sum+=recordprice,0)
    }
    render(){
        const {records}=this.props;
        const totalPrice=this.totalPrice();
        return (
            <div>
                <table className="table table-striped mytable">
                    <thead>
                        <tr className="table-tittle">
                            <td>日期</td>
                            <td>消费</td>
                            <td>金额</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         records.map((record,index)=>(
                            <Record key={record.id} record={record} id={record.id}
                            deleteRecord={this.props.deleteRecord}
                            sendEdit={this.props.sendEdit}/>
                         ))
                        }
                    </tbody>
                    <tfoot>
                        <tr className="table-tittle">
                            <td colSpan="2">总计：</td>
                            <td>￥{totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}