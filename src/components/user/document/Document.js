import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { omit } from "lodash"
import { connect } from "react-redux"
import axios from "axios"
import Select from "../../common/Select"
import "../custom.css"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import styled from "styled-components"
import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"
import UserContentMenu from "../UserContentMenu"
import UserHeaderMenu from "../UserHeaderMenu"
import { contract, representative_list } from "../add/Common"

import { getUser, addUser } from "../../../actions/userActions"

const fileArr = [
  {
    name: "Đơn xin việc.docx",
    link:
      "https://drive.google.com/uc?export=download&id=19ENEZEKtSVHXrGDE6xDGChQ4j-WpgkP8",
  },
  {
    name: "Bản sao khai sinh.docx",
    link:
      "https://drive.google.com/uc?export=download&id=1nFfRTR78DO4UuaTrTUzuFzMhYPJWLX8d",
  },
]

const Document = (props) => {
  const { pathname } = props.location
  const userid = props.match.params.id
  const [data, setData] = useState({ data: [] })
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
      console.log(res.data.payload)

      let resCate = await axios(global.uri + `/admin/user_documents/category`)
      resCate = await resCate

      const dt = resCate.data.payload.map((item1) => ({
        ...item1,
        ...newRes.find((item2) => item2.id === item1.id),
      }))

      const fileData = res.data.payload.files.map(
        ({ name, link, ext, ...attr }) => ({
          name: { ...attr }.category,
          link:
            global.uri + "/admin/user_documents/files/" + { ...attr }.file_id,
          ext: { ...attr }.extension,
        })
      )

      const dt2 = dt.map(({ files, ...attr }) => ({
        files: fileData.filter((item2) => item2.name == { ...attr }.name),
        ...attr,
      }))

      setData({
        category: dt2,
        file: fileData,
      })
      window.stop_preloader()
    }
    getDocumentAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("userid", userid)
  console.log("pathname", pathname)
  console.log(data)
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
                  <ContentWrapper>
                    {data.category &&
                      data.category.map((item, index) => (
                        <CheckBoxWrapper key={index}>
                          <FormControl component="fieldset">
                            <FormGroup row>
                              <FormControlLabelCustom
                                control={
                                  <GreenCheckbox
                                    disabled
                                    checked={item.checked}
                                    name={`checked-${index}`}
                                  />
                                }
                                label={item.description}
                              />
                            </FormGroup>
                          </FormControl>
                          <FileDownloadWrapper>
                            {item.files &&
                              item.files.map((item2, index2) => (
                                <FileDownloadItem
                                  key={index2}
                                  href={item2.link}
                                  target="__blank"
                                  download
                                >
                                  <FileDownloadLogo>
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="arrow-square-down"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 448 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zM328.4 227.1L256 302.6V120c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v182.6l-72.4-75.5c-9.3-9.7-24.8-9.9-34.3-.4l-10.9 11c-9.4 9.4-9.4 24.6 0 33.9L207 404.3c9.4 9.4 24.6 9.4 33.9 0l132.7-132.7c9.4-9.4 9.4-24.6 0-33.9l-10.9-11c-9.5-9.5-25-9.3-34.3.4z"
                                      ></path>
                                    </svg>
                                  </FileDownloadLogo>
                                  <FileDownloadName>
                                    {item.description}
                                    -Part{index2 + 1}
                                    {item2.ext}
                                  </FileDownloadName>
                                </FileDownloadItem>
                              ))}
                          </FileDownloadWrapper>
                        </CheckBoxWrapper>
                      ))}
                  </ContentWrapper>
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
  grid-template-columns: 40% auto;
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

export default connect(mapStateToProps, { getUser, addUser })(
  withRouter(Document)
)
