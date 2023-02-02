import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react'

function BlogDetail() {

    const [value, setValue] = useState('');

    return (
        <div className="" data-color-mode="light">
            <MDEditor.Markdown source={value} />
        </div>
    )
}

export default BlogDetail