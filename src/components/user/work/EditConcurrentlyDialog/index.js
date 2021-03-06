import './EditConcurrentlyDialog.css' 
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  FormControl,
  FormControlLabel,
  FormHelperText,

  MenuItem,

  RadioGroup,
  Radio,
  Select,

  Button,  
  IconButton,
  InputLabel,
  TextField  
} from '@material-ui/core'

import { connect } from 'react-redux';

import { getStore, getDepartment, getRole, getSubRole } from '../../../../actions/workAction';
import moment from 'moment';

function EditConcurrentlyDialog({ edit, data, onClose, onSubmit,
  stores, departments, roles, subRoles,
  getStore, getDepartment, getRole, getSubRole }) {

  //#region Datas 
  const [status, setStatus] = useState(data?.status ?? 0)
  const [department, setDepartment] = useState(data?.nameBranch || "")
  const [role, setRole] = useState(data?.role || "")
  const [subRole, setSubRole] = useState(data?.subRole || "")
  const [activeDate, setActiveDate] = useState(moment(data?.activeDate || '').format("yyyy-MM-DD"))
  const [deactiveDate, setDeactiveDate] = useState(moment(data?.deactiveDate || '').format("yyyy-MM-DD"))
  const [branchType, setBranchType] = useState(data?.branchType || "1")
  const [error, setError] = useState([])
  //#endregion

  //#region Events
  const handleRadioChange = (event) => {
    setBranchType(event.target.value)
    setDepartment('')
    if(!stores.length) getStore()
  }
  
  const onDepartmentSelect = (e) => {
    let _i = error.indexOf('department')
    if(_i !== -1) setError(error.filter((v,i) => i !== _i))
    setDepartment(e.target.value)
  }

  const onRoleSelect = (e) => {
    let _i = error.indexOf('role')
    if (_i !== -1) setError(error.filter((v, i) => i !== _i))
    if (!subRoles[e.target.value]) setSubRole('') || getSubRole(e.target.value)
    setRole(e.target.value)
  }

  const onSubRoleSelect = (e) => {
    setSubRole(e.target.value )
  }

  const onStartAtChange = (e) => {
    let _i = error.indexOf('activeDate')
    if(_i !== -1) setError(error.filter((v,i) => i !== _i))
    setActiveDate(e.target.value)
  }

  const onEndAtChange = (e) => {
    let _i = error.indexOf('deactiveDate')
    if(_i !== -1) setError(error.filter((v,i) => i !== _i))
    setDeactiveDate(e.target.value)
  }

  const handleSubmit = () => {
    let _error = []

    if (department === '') _error.push('department')
    if (activeDate === '') _error.push('activeDate')
    if (deactiveDate === '') _error.push('deactiveDate')
    if (branchType === '') _error.push('branchType')
    if (role === '') _error.push('role')

    if(!_error.length){
      return onSubmit({
        _id: data?.id,
        branchType: branchType === '1'? 'office' : 'branch',
        _branch: department,
        _role: role,
        _subRole: subRole,
        status: status,
        activeDate: activeDate,
        deactiveDate: deactiveDate,
        typeJob: 2,
        edit: edit
      })
    }
    setError(_error)
  }
  //#endregion

  
  useEffect(() => {
    if (!departments.length) getDepartment()
    if (!stores.length) getStore()
    if (!roles.length) getRole()

    if (data?.id && !subRoles[data.role])
      getSubRole(data.role)
  }, [])

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="edit-concurrently-dialog">
      <DialogTitle className="customized-dialog-title">
        {
          edit ? "S???a ki??m nhi???m" : "Th??m ki??m nhi???m"
        }
        <IconButton className="edit-concurrently-dialog-close-btn" onClick={onClose} aria-label="delete">
          <i className="fa fa-close"></i>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <fieldset className="edit-concurrently-dialog-fieldset">
          <RadioGroup row className="justify-content-between px-5"
            aria-label="branchType"
            name="branchType"
            value={branchType}
            onChange={handleRadioChange}
          >
            <FormControlLabel value={'1'} control={<Radio />} label="V??n ph??ng" />
            <FormControlLabel value={'2'} control={<Radio />} label="Chi nh??nh" />
          </RadioGroup>
          <div>
            <FormControl variant="outlined" error={ error.indexOf('department') !== -1 }>
              <InputLabel>{ branchType === '1' ? 'Ch???n ph??ng ban' : 'Ch???n chi nh??nh' }</InputLabel>
              <Select label={ branchType === '1' ? 'Ch???n ph??ng ban' : 'Ch???n chi nh??nh' }
                value={department}
                onChange={onDepartmentSelect}>
                {branchType === '2' ?
                  stores && stores.map(e => (<MenuItem key={e.id} value={e.id}>{e.storeName}</MenuItem>)) :
                  departments && departments.map(e => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))
                }
              </Select>
              {error.indexOf('department') !== -1 && <FormHelperText>Error</FormHelperText>}
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" error={ error.indexOf('role') !== -1 }>
              <InputLabel>V??? tr?? c??ng vi???c</InputLabel>
              <Select label="V??? tr?? c??ng vi???c"
                value={role}
                onChange={onRoleSelect}>
                {
                  roles && roles.map(e => (<MenuItem key={e.id} value={e.id}>{ e.roleName }</MenuItem>))
                }
              </Select>
              {error.indexOf('role') !== -1 && <FormHelperText>Error</FormHelperText>}
            </FormControl>
          </div> 
          <div>
            <FormControl variant="outlined" error={ error.indexOf('role') !== -1 }>
              <InputLabel>Ch???c v???</InputLabel>
              <Select label="Ch???c v???"
                value={subRole}
                onChange={onSubRoleSelect}>
                {
                  subRoles[role] && subRoles[role].map(e => (<MenuItem key={e.id} value={e.id}>{ e.name }</MenuItem>))
                }
              </Select>
              {error.indexOf('role') !== -1 && <FormHelperText>Error</FormHelperText>}
            </FormControl>
          </div>
        </fieldset>
        <div>
          <TextField
            type="date"
            value={activeDate}
            variant="outlined"
            label="Ng??y b???t ?????u"
            error={error.indexOf('activeDate') !== -1}
            helperText={ error.indexOf('activeDate') !== -1 && "Error"}
            onChange={onStartAtChange}
            InputLabelProps={{shrink: true}}
          />
        </div>
        <div>
          <TextField
            type="date"
            value={deactiveDate}
            variant="outlined"
            label="Ng??y k???t th??c"
            error={error.indexOf('deactiveDate') !== -1}
            helperText={ error.indexOf('deactiveDate') !== -1 && "Error"}
            onChange={onEndAtChange}
            InputLabelProps={{shrink: true}}
          />
        </div>
        <div>
          <FormControl variant="outlined">
            <Select value={status} onChange={(e) => setStatus(e.target.value)} >
              <MenuItem value='1'>??ang l??m vi???c</MenuItem>
              <MenuItem value='0'>???? l??m vi???c</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" className="btn-green">
          L??u
        </Button>
        <Button onClick={onClose} variant="contained" className="btn-warning">
          H???y
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditConcurrentlyDialog.defaultProps = {
  active: true,
  edit: false,
  data: {
    id: null,
    branchType: '1',
    _branch: "",
    _role: "",
    _subRole: "",
    status: 1,
    activeDate: null,
    deactiveDate: null,
    typeJob: 0
  }
}

const mapStateToProps = (state) => ({
  stores: state.work.stores,
  departments: state.work.departments,
  roles: state.work.roles,
  subRoles: state.work.subRoles
})

export default connect(mapStateToProps, { getStore, getDepartment, getRole, getSubRole })(EditConcurrentlyDialog)