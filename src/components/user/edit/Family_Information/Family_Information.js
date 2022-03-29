import React, { Component } from 'react'
import Select from "../../../common/Select"
import validator from 'validator';

import Family_Item from './Family_Item'

export default class Family_Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "",
            family: [],
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const family = nextProps.family
        if(family != this.state.family){
            family && family.map(item => {
                if(item.is_depend == true){
                    item.is_depend = 1
                }
                if(item.is_depend == false){
                    item.is_depend = 0
                }
                if(item.delete_flag == false){
                    item.delete_flag = 0
                }
                return item
            })
          this.setState({
            family: family
          })
        }
    }

    componentDidUpdate() {
        console.log(this.state.family);
    }

    ItemFamilyChange = (payload) => {
        var { family } = this.state
        family = family.map((item, index) => {
            if(index === payload.idx){
                item.relationship = payload.relationship
                item.fullname = payload.fullname
                item.birthday = payload.birthday
                item.career = payload.career
                item.address = payload.address
                item.mobile = payload.mobile
                item.is_depend = payload.is_depend
                if(payload.id){
                    item.checkEdit = 1
                }else{
                    item.checkEdit = 2
                }
            }
            return item
        })
        this.setState({family: family});
        this.props.onChange(family);
    }

    renderData = () => {
        const { family, errors } = this.state;
        console.log('renderData', family);
        if(family){
            return family.map((item, index) => {
                if(item.checkEdit !== 3){
                    return (
                        <Family_Item 
                          key={index}
                          position={index}
                          item={item}
                          onChange={this.ItemFamilyChange}
                          onDelete={this.DeleteItem}
                          errors={errors}
                          isValid={this.isValid}
                        />
                    );
                }
            });
        }
    }

    DeleteItem = (index) => {
      const {family} = this.state
      if(family[index].id){
        family[index] = {
          checkEdit: 3,
          id: family[index].id
        }
      }else{
        family.splice(index,1)
      }

      console.log(family);

      this.setState({
          family: family
      })

      this.props.onDelete(family);
    }

    addFamilyButton = () => {
        const {family} = this.state
        family.push({
          relationship: '',
          fullname: '',
          birthday: '',
          career: '',
          address: '',
          mobile: '',
          is_depend: ''
        })
        this.setState({
          family
        })
        this.props.onChange(family);
      }

    render() {
        return (
            <div className="panel-body family">
                <div className="row">
                    <div className="form-group col-md-12">
                        <div className="header-title">Thông tin gia đình</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="data" className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Mối quan hệ</th>
                                        <th>Họ và tên</th>
                                        <th>Năm sinh</th>
                                        <th>Nghề nghiệp</th>
                                        <th>Địa chỉ</th>
                                        <th>Điện thoại</th>
                                        <th>Người phụ thuộc</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12"><i className="pe-7s-plus add-family-info" onClick={this.addFamilyButton}></i></div>
                </div>    
            {/* </form> */}
            </div>
        )
    }
}
