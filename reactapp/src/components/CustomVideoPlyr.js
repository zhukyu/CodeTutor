import { APITypes, PlyrInstance, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css"
import { forwardRef, useEffect } from "react";

const CustomVideoPlyr = forwardRef((props, ref) => {
    const { source, options = null, ...rest } = props
    const raptorRef = usePlyr(ref, {
        source,
        options,
    })
    useEffect (() => {
        const player = document.querySelector('video')
        if(player) {
            player.currentTime = props.timestamp;
            // player.play();
        } 
    })
    return <video ref={raptorRef} className="plyr-react plyr" id='plyr' {...rest} />
})

export default CustomVideoPlyr