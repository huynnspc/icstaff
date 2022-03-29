import "../custom.css"

import React, { useEffect, useState } from "react"
import classNames from 'classnames'

import { Link, withRouter } from "react-router-dom"
import axios from "axios"

import { connect } from "react-redux"
import { getUser, addUser } from "../../../actions/userActions"
import Select from "../../common/Select"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import styled from "styled-components"
import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"
import UserContentMenu from "../UserContentMenu"
import UserHeaderMenu from "../UserHeaderMenu"

const Document = (props) => {
  const { pathname } = props.location
  const userid = props.match.params.id
  const [data, setData] = useState({ data: [] })
  const [fileData, setFileData] = useState([])
  const [remove, setRemove] = useState([])
  window.start_preloader()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getDocumentAPI = async () => {
      let res = await axios(
        global.uri + `/admin/user_documents/getByUserId/${userid}`
      )
      res = await res
      let newRes = res.data.payload.documentList.map(
        ({ id, ...keepAttrs }) => ({
          id: { ...keepAttrs }.category_id,
          checked: true,
        })
      )

      let resCate = await axios(global.uri + `/admin/user_documents/category`)

      const dt = resCate.data.payload.map((item1) => ({
        ...item1,
        ...newRes.find((item2) => item2.id === item1.id),
      }))

      const fileData = res.data.payload.files.map(
        ({ id, name, link, ext, ...attr }, index) => ({
          id: id,
          name: { ...attr }.category,
          link:
            global.uri + "/admin/user_documents/files/" + { ...attr }.file_id,
          ext: { ...attr }.extension,
        })
      )

      const dt2 = dt.map(({ files, ...attr }) => ({
        files: fileData.filter((item2) => item2.name == { ...attr }.name).map((e, i) => ({...e, no: i})),
        ...attr,
      }))

      setData({
        category: dt2,
        file: fileData,
      })
      window.stop_preloader()
    }
    getDocumentAPI()
  }, [userid])

  const handleUploadFile = (e) => {
    e.preventDefault()
    // get index 
    const id = e.target.getAttribute("index")
    const index = data.category.findIndex((obj) => obj.id == id)
    
    // add file to upload
    const { name: type, files } = e.target
    const newData = { ...data }

    if (files.length) setFileData([...fileData, { type, files }]) // upload file
    else setFileData(fileData.filter(e => e.type !== type))  // cancel upload

    // set checked
    newData.category[index].checked = // if cancel upload file => check old upload file 
      (!!files.length || newData.file.findIndex(o => o.name === type) !== -1)
    
    setData(newData)
  }

  useEffect(() => window.stop_preloader(), [fileData, data])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // post data
    let postData = { user_id: userid, listDocuments: "" }
    
    data.category.forEach((item) => postData.listDocuments += item.checked ? (item.id + ",") : "")

    postData.listDocuments = postData.listDocuments.slice(0, -1)

    const params = new URLSearchParams()
    params.append("user_id", postData.user_id)
    params.append("listDocuments", postData.listDocuments)

    const listDocPost = axios.post(
      global.uri + "/admin/user_documents", params,
      { headers: {"Content-Type": "application/x-www-form-urlencoded"} }
    )
    
    const uploadTo = global.uri + "/admin/uploads/file";
    const config = { headers: { "Content-Type": "multipart/form-data" } }

    const bodyFormDataTypeHousehold = new FormData()
    const bodyFormDataTypeDegree = new FormData()
    const bodyFormDataTypeProfile = new FormData()
    const bodyFormDataTypeHealth = new FormData()
    const bodyFormDataTypeId = new FormData()
    const bodyFormDataTypeBirthCertificate = new FormData()
    const bodyFormDataTypeImage = new FormData()
    const bodyFormDataRemove = new URLSearchParams()
    if (remove.length) bodyFormDataRemove.append('idList', remove.map(e => e.id).join(','))
    fileData.map((item) => {
      switch (item.type) {
        case "household":
          bodyFormDataTypeHousehold.append("userId", userid)
          bodyFormDataTypeHousehold.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeHousehold.append("file", file))
          break
        case "degree":
          bodyFormDataTypeDegree.append("userId", userid)
          bodyFormDataTypeDegree.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeDegree.append("file", file))
          break
        case "health":
          bodyFormDataTypeHealth.append("userId", userid)
          bodyFormDataTypeHealth.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeHealth.append("file", file))
          break
        case "profile":
          bodyFormDataTypeProfile.append("userId", userid)
          bodyFormDataTypeProfile.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeProfile.append("file", file))
          break
        case "id":
          bodyFormDataTypeId.append("userId", userid)
          bodyFormDataTypeId.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeId.append("file", file))
          break
        case "image":
          bodyFormDataTypeImage.append("userId", userid)
          bodyFormDataTypeImage.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeImage.append("file", file))
          break
        case "birth certificate":
          bodyFormDataTypeBirthCertificate.append("userId", userid)
          bodyFormDataTypeBirthCertificate.append("type", item.type)
          Array.from(item.files).forEach((file) => bodyFormDataTypeBirthCertificate.append("file", file))
          break
      }
    })

    const uploadHouseholdDocFilePost =
      !bodyFormDataTypeHousehold.entries().next().done ?  
        axios.post(uploadTo, bodyFormDataTypeHousehold, config) : null

    const uploadDegreeDocFilePost =
      !bodyFormDataTypeDegree.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeDegree, config) : null

    const uploadHealthDocFilePost =
      !bodyFormDataTypeHealth.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeHealth, config) : null

    const uploadProfileDocFilePost = 
      !bodyFormDataTypeProfile.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeProfile, config ) : null

    const uploadIdDocFilePost = 
      !bodyFormDataTypeId.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeId, config) : null

    const uploadImageDocFilePost = 
      !bodyFormDataTypeImage.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeImage, config) : null

    const uploadBirthCertificateDocFilePost = 
      !bodyFormDataTypeBirthCertificate.entries().next().done ?
        axios.post(uploadTo, bodyFormDataTypeBirthCertificate, config) : null
    
    const removeNoUseFiles = remove.length ?
      axios.post(global.uri + '/admin/users/deleteFile', bodyFormDataRemove,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }) : null

    axios.all([
        listDocPost,
        uploadBirthCertificateDocFilePost,
        uploadDegreeDocFilePost,
        uploadHealthDocFilePost,
        uploadHouseholdDocFilePost,
        uploadIdDocFilePost,
        uploadImageDocFilePost,
        uploadProfileDocFilePost,
        removeNoUseFiles
      ])
      .then(
        axios.spread((...responses) => { // use/access the results
          window.start_preloader()
          props.history.goBack()
        })
      )
      .catch((errors) => /* react on errors. */ console.error(errors))
  }
  const handleBackOnClick = () => {
    props.history.goBack()
  }
  const handleClickCheckbox = (e) => {
    let value = e.target.value
    let index = data.category.findIndex((obj) => obj.id == value)
    const newData = { ...data }
    let temp = newData.category[index]
    temp.checked
      ? (newData.category[index].checked = false)
      : (newData.category[index].checked = true)
    setData(newData)
  }
  const onDelete = (ca, i) => (e) => {
    e.preventDefault()
    e.stopPropagation()

    const newData = { ...data }
    const category = newData.category[ca]
    const file = category.files[i]

    newData.category[ca].files[i].isRemove = true;
    setData(newData)
    // set remove
    setRemove([...remove, { type: category.name, id: file.id }])
  }
  const onUnDelete = (ca, i) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newData = { ...data }
    const category = newData.category[ca]
    const file = category.files[i]

    newData.category[ca].files[i].isRemove = false;
    setData(newData)
    // set remove
    setRemove(remove.filter(e => e.id !== file.id))
  }

  return (
    <div id="wrapper" className="wrapper animsition">
      <Navbar />
      <Left pathname={pathname} />

      <div className="control-sidebar-bg"></div>

      <div id="page-wrapper">
        <div className="content userinfo">
          <UserHeaderMenu pathname={pathname} userid={userid} />
          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-bd lobidrag">
                <UserContentMenu pathname={pathname} userid={userid} />
                <div className="panel-body information">
                  <form onSubmit={(e) => handleFormSubmit(e)}>
                    <ContentWrapper>
                      {data.category &&
                        data.category.map((item, index) => (
                          <CheckBoxWrapper style={{ gridTemplateColumns: '25% 45% auto', paddingTop: index === 0 ? 0: '10px' }} key={index}>
                            <FormControl component="fieldset">
                              <FormGroup row>
                                <FormControlLabelCustom
                                  control={
                                    <GreenCheckbox
                                      checked={ item.checked ? item.checked : false }
                                      value={item.id}
                                      name={`checked-${index}`}
                                      onClick={(e) => handleClickCheckbox(e)}
                                      disabled={item.name !== "email"}
                                    />
                                  }
                                  label={item.description}
                                />
                              </FormGroup>
                            </FormControl>
                            <FileDownloadWrapper>
                              {item.files &&
                                item.files.map((item2, index2) => (
                                  <div key={item2.link} style={{ paddingTop: '5px' }}>
                                    <div style={{ display: 'inline-flex', width: '60px' }}>
                                      {
                                        item2.isRemove ?
                                          <button
                                            style={{ backgroundColor: '#558b2f', color: '#2c3136', border: 'none', margin: '0px 2px' }}
                                            onClick={onUnDelete(index, index2)}
                                          >
                                            <i className="fa fa-times" />
                                          </button> :
                                          <button
                                            style={{ backgroundColor: '#558b2f', color: '#2c3136', border: 'none', margin: '0px 2px' }}
                                            onClick={onDelete(index, index2)}
                                          >
                                            <i className="fa fa-trash" />
                                          </button>
                                      }
                                      <a
                                        style={{ backgroundColor: '#558b2f', color: '#2c3136', border: 'none', margin: '0px 2px', padding: '0 5px 0 4px' }}
                                        href={item2.link}
                                        target="__blank"
                                        download
                                      >
                                        <i className="fa fa-download" />
                                      </a>
                                    </div>
                                    <label className={classNames(item2.isRemove && 'text-danger')}>{`${item.description}-Part${item2.no + 1}${item2.ext}`}</label>
                                  </div>
                                ))}
                            </FileDownloadWrapper>
                            <FileUploadWrapper style={{paddingTop: '5px'}}>
                              <input
                                type={item.name == "email" ? "hidden" : "file"}
                                id="file"
                                multiple
                                index={item.id}
                                name={item.name}
                                onChange={(e) => handleUploadFile(e)}
                                accept={item.extAccept}
                              />
                            </FileUploadWrapper>
                          </CheckBoxWrapper>
                        ))}
                    </ContentWrapper>
                    <div
                      className="col-md-12 flex-container"
                      style={{ justifyContent: "center" }}
                    >
                      <button
                        className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                        type="submit"
                      >
                        Cập nhật
                      </button>
                      <button
                        className="btn btn-danger btn-rounded w-md m-t-5 m-r-5"
                        type="button"
                        onClick={() => handleBackOnClick()}
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
})

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  padding-bottom: 10px;
`

const CheckBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 40%;
  border-bottom: 1px solid #8080804d;
  padding-bottom: 5px;
`

const FormControlLabelCustom = styled(FormControlLabel)`
  * {
    font-size: 13px !important;
  }
  > span {
    color: inherit !important;
    :hover {
      background-color: rgb(84 139 47 / 8%) !important;
    }
  }
`

const GreenCheckbox = styled(Checkbox)`
  &[aria-disabled="true"] {
    span:first-child {
      color: gray !important;
    }
  }
`

const FileDownloadWrapper = styled.div`
  display: grid;
`

const FileDownloadItem = styled.a`
  display: flex;
  align-items: center;
`

const FileDownloadName = styled.p`
  font-size: 13px;
  font-style: italic;
  margin: 0;
  padding-left: 10px;
`

const FileDownloadLogo = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
`
const FileUploadWrapper = styled.div`
  &:not(:first-child) {
    padding-top: 10px;
  }
`

export default connect(mapStateToProps, { getUser, addUser })(
  withRouter(Document)
)
