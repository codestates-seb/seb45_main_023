import React, {useState, useRef} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';

const Editor = ({body, setBody, setImage}) => {
    const blog_id = useParams().blogId;
    const [flag, setFlag] = useState(false);

    const customUploadAdapter = (loader) => { 
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                     loader.file.then( (file) => {
                            data.append("name", file.name);
                            data.append("file", file);

                            axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog_id}/upload-images`, data)
                                .then((res) => {
                                    if(!flag){
                                        setFlag(true);
                                        setImage(res.data.filename);
                                    }
                                    resolve({
                                        default: `${process.env.REACT_APP_SERVER_URL}/blogs/print-image?name=/${res.data.filename}`
                                    });
                                })
                                .catch((err)=>reject(err));
                        })
                })
            }
        }
    }

    function uploadPlugin (editor){ 
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [uploadPlugin]
            }}
            data=''
            onReady={editor => {
                // console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
                console.log(body);
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}/>
    )
}

export default Editor;