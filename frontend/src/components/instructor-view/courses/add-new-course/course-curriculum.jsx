import { useContext, } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseCurriculumInitialFormData } from "@/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mediaUploadService } from "@/services";
import MediaProgressbar from "@/components/media-progress-bar";



function CourseCurriculum(){

    const { 
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage 
    } = useContext(InstructorContext);


    // Adding new lecture
    function handleNewLecture() {
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            {
             ...courseCurriculumInitialFormData[0],
            },
        ]);
    }

    // Handling course title change
    function handleCourseTitleChange(event, currentIndex) {
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
          ...cpyCourseCurriculumFormData[currentIndex],
          title: event.target.value,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

    // Handling free preview change
    function handleFreePreviewChange(currentValue, currentIndex) {
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
         ...cpyCourseCurriculumFormData[currentIndex],
         freePreview: currentValue,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);

    }

    // Handling single lecture upload
    async function handleSingleLectureUpload(event, currentIndex) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];

        if (selectedFile) {
        const videoFormData = new FormData();
        videoFormData.append("file", selectedFile);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
                
                if (response.success) {
                    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
                    cpyCourseCurriculumFormData[currentIndex] = {
                        ...cpyCourseCurriculumFormData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id,
                    };
                    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
                    setMediaUploadProgress(false);

                }




            } catch (error) {
                console.log(error);
                
            }
        }
    }



    console.log(courseCurriculumFormData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleNewLecture}>
                   Add Lecture 
                </Button>
                {mediaUploadProgress ? (
                    <MediaProgressbar
                        isMediaUploading={mediaUploadProgress}
                        progress={mediaUploadProgressPercentage}
                    />
                ) : null}
                <div className="mt-4 space-y-4">
                    {
                     courseCurriculumFormData.map((curriculumItem, index) => (
                     <div className="border p-5 rounded-md">
                       <div className="flex gap-5 items-center">
                        <h3 className="font-semibold">Lecture {index + 1}</h3>
                        <Input
                        name={`title-${index + 1}`}
                        placeholder="Enter lecture title"
                        className="max-w-96"
                        onChange={(event) => handleCourseTitleChange(event, index)}
                        value={courseCurriculumFormData[index]?.title}   
                        />
                        <div className="flex items-center space-x-2">
                            <Switch
                             onCheckedChange={(value) =>
                                handleFreePreviewChange(value, index)
                             } 
                             checked= {courseCurriculumFormData[index]?.freePreview}
                             id={`freePreview-${index + 1}`}                           
                            />
                            <Label htmlFor={`freePreview-${index + 1}`}>
                                Free Preview
                            </Label>
                        </div>
                       </div>
                       <div className="mt-6">
                        <Input
                         type="file"
                         accept="video/*"
                         onChange={(event) =>
                            handleSingleLectureUpload(event, index)
                         }
                         className="mb-4"
                        />
                       </div>
                     </div>   
                    ))
                    }
                </div>
            </CardContent>

        </Card>
        
            
    )

}

export default CourseCurriculum;