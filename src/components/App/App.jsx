import React,{Component} from 'react'
import axios from 'axios'

import Records from '../Records/Records'
import RecordsForm from '../RecordsForm/RecordsForm'

import '../../css/index.css'

class App extends Component{
    state={
        records:[
        ]
    }
    // 更新状态——也应该放在这里
    addItem=(item)=>{
        item.id=new Date(Date.now());
        const records=this.state.records;
        this.setState({records:[item,...records]})
    }
    //第一次组件渲染结束以后，开始异步获取数据
    async componentDidMount() {
        // 发送请求
        var response=await axios.get("http://localhost:3000/records");//模拟接口，获取数据
        var records=response.data
        records=records.reverse();
        // console.log(result)
        // 渲染页面
        this.setState({records})
    }
    deleteRecord=(id)=>{
        var records=this.state.records.filter((item)=>item.id!==id)
        // console.log(records)
        // 同步更新页面
        this.setState({records})
        // 删除json数据中相应数据
        axios.delete("http://localhost:3000/records/"+id)
    }
    sendEdit=(editrecord)=>{
        var newRecords=[].slice.apply(this.state.records);
        console.log(newRecords)
        for(var record of newRecords){
            console.log(record)
            if(record.id===editrecord.id)
            Object.assign(record,editrecord)
        }
        this.setState({records:newRecords})
    }
    render(){
        const {records}=this.state;
        return (
            <div>
                <h2 className="recordsTittle">我的记账簿</h2>
                <div className='app'>  
                    {/* 这里来我们新建表单 */}
                    <RecordsForm addItem={this.addItem}/>
                    <Records records={records} deleteRecord={this.deleteRecord} sendEdit={this.sendEdit}/>
                </div>
            </div>
        )
    }
}
export default App;