import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { styles } from "../../../styles/style"
import { BiSolidPencil } from 'react-icons/bi'
import { BsLink45Deg } from 'react-icons/bs'
import toast from 'react-hot-toast'
function CourseContent({ active, setActive, courseContent, setCourseContent, handleSubmit: handleCoursubmit }) {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContent.length).fill(false)
  )
  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed]
    updatedCollapsed[index] = !updatedCollapsed[index]
    setIsCollapsed(updatedCollapsed)
  }
  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContent]
    updatedData[index].links.splice(linkIndex, 1)
    setCourseContent(updatedData)
  }

  const handleAddLink = (index) => {
    const updatedData = [...courseContent]
    updatedData[index].links.push({ title: "", url: "" })
    setCourseContent(updatedData)
  }

  const newContentHandler = (item) => {

    if (item.title === "" || item.videoUrl === "" || item.description === "" || item.links[0].title === "" || item.links[0].url === "") {
      toast.error("Please fill the previous content")

    }
    else {
      let newVideoSection = "";
      if (courseContent.length > 0) {
        const lastVideoSection = courseContent[courseContent.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        title: "",
        videoUrl: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  };



  const addNewSection = () => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the previous content")
    }
    else {
      setActiveSection(activeSection + 1)
      const newContent = {
        title: "",
        videoUrl: "",
        description: "",
        videoSection: `Untitled Section ${activeSection + 1}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  }

  const handlePrev = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    if (
      courseContent[courseContent.length - 1].title !== "" &&
      courseContent[courseContent.length - 1].videoUrl !== "" &&
      courseContent[courseContent.length - 1].description !== "" &&
      courseContent[courseContent.length - 1].links[0].title !== "" &&
      courseContent[courseContent.length - 1].links[0].url !== ""
    ) {
      setActive(active + 1)
      handleCoursubmit()
    }
    else {
      toast.error('Please fill all the fields')
    }
  }




  return (
    <div className='w-[80%] m-auto mt-24 p-3'>
      <form onSubmit={handleSubmit}>
        {
          courseContent.map((item, index) => {
            const showSectionInput = index === 0 || item.videoSection !== courseContent[index - 1].videoSection


            return (
              <>
                <div
                  className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                    }`}>
                  {
                    showSectionInput && (
                      <>
                        <div className='flex w-full items-center'>


                          <input type="text"
                            className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                            value={item.videoSection}
                            onChange={(e) => {
                              const updatedData = [...courseContent]
                              updatedData[index].videoSection = e.target.value
                              setCourseContent(updatedData)
                            }} />
                          <BiSolidPencil className='cursor-pointer dark:text-white text-black' />
                        </div>
                        <br />
                      </>

                    )
                  }
                  <div
                    className='flex w-full items-center justify-between my-0'>
                    {
                      isCollapsed[index] ? (
                        <>
                          {
                            item.title ? (
                              <p className='font-Poppins dark:text-white text-black'>
                                {index + 1}.{item.title}

                              </p>
                            ) : <></>
                          }
                        </>) : (
                        <div>

                        </div>
                      )
                    }

                    <div className='flex items-center'>
                      <AiOutlineDelete
                        className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                          }`}

                        onClick={() => {
                          if (index > 0) {
                            const updatedData = [...courseContent];
                            updatedData.splice(index, 1);
                            setCourseContent(updatedData);

                          }
                        }
                        }
                      />
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        className='dark:text-white text-black'
                        style={{
                          transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                        onClick={() => handleCollapseToggle(index)}

                      />
                    </div>


                  </div>
                  {
                    !isCollapsed[index] && (
                      <>
                        <div className='my-3'>
                          <label htmlFor="" className={styles.label}>Video Title</label>
                          <input type="text" name="" id=""
                            className={styles.input}
                            placeholder='Project Plan...'
                            value={item.title}
                            onChange={(e) => {
                              const updatedData = [...courseContent]
                              updatedData[index].title = e.target.value
                              setCourseContent(updatedData)
                            }} />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className={styles.label}>Video Url</label>
                          <input type="text" name="" id=""
                            className={styles.input}
                            placeholder='sdder'
                            value={item.videoUrl}
                            onChange={(e) => {
                              const updatedData = [...courseContent]
                              updatedData[index].videoUrl = e.target.value
                              setCourseContent(updatedData)
                            }} />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className={styles.label}>Video Description</label>
                          <textarea
                            rows={8}
                            cols={30}
                            className={`${styles.input} !h-min`}
                            placeholder='sdder'
                            value={item.description}
                            onChange={(e) => {
                              const updatedData = [...courseContent]
                              updatedData[index].description = e.target.value
                              setCourseContent(updatedData)
                            }} />
                          <br />
                        </div>
                        {
                          item.links.map((link, linkIndex) => (
                            <div className='mb-3 block'>
                              <div className='w-full flex items-center justify-between'>
                                <label className={styles.label}>Link {linkIndex + 1}</label>
                                <AiOutlineDelete
                                  className={`${linkIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
                                    } dark:text-white text-black`}
                                  onClick={() => {
                                    if (linkIndex > 0) {
                                      handleRemoveLink(index, linkIndex)
                                    }
                                  }
                                  }
                                />
                              </div>
                              <input type="text"
                                className={styles.input}
                                placeholder='Source Code ... Link Title'
                                value={link.title}
                                onChange={(e) => {
                                  const updatedData = [...courseContent]
                                  updatedData[index].links[linkIndex].title = e.target.value
                                  setCourseContent(updatedData)
                                }} />
                              <input type="text"
                                className={styles.input}
                                placeholder='Source Code Url... Link Title'
                                value={link.url}
                                onChange={(e) => {
                                  const updatedData = [...courseContent]
                                  updatedData[index].links[linkIndex].url = e.target.value
                                  setCourseContent(updatedData)
                                }} />
                            </div>
                          ))
                        }
                        <br />
                        <div className='inline-block mb-4'>
                          <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                            onClick={() => handleAddLink(index)}>
                            <BsLink45Deg className='mr-2' />Add Link
                          </p>
                        </div>
                      </>
                    )
                  }
                  <br />
                  {
                    index === courseContent.length - 1 && (
                      <div>
                        <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                          onClick={() => newContentHandler(item)}>
                          <AiOutlinePlusCircle className='mr-2' />Add New Content
                        </p>
                      </div>

                    )
                  }
                </div >
              </>
            )

          })
        }
        <br />
        <div className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
          onClick={() => addNewSection()}>
          <AiOutlinePlusCircle className='mr-2' />Add New Section
        </div>
      </form >
      <br />
      <div className='w-full flex justify-between'>

        <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 mb-3 cursor-pointer'
          onClick={handlePrev}>
          Prev
        </div>
        <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 mb-3 cursor-pointer'
          onClick={handleOptions}
        >
          Next
        </div>

      </div>
    </div >
  )
}

export default CourseContent