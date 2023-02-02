import { APITypes, PlyrInstance, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css"
import { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";

const CustomVideoPlyr = forwardRef((props, ref) => {
    const { source, options = null, ...rest } = props
    const raptorRef = usePlyr(ref, {
        source,
        options,
    })
    const [stop, setStop] = useState(false);
    const [progress, setProgress] = useState(
        { lesson_id: '', progress: 0 }
    );
    useEffect(() => {
        const player = document.querySelector('video')
        if (player) {
            player.currentTime = props.current_time;
            // player.play();
        }
    })

    useLayoutEffect(() => {
        let previousTime = 0;
        let currentTime = 0;
        let seekStart = null;
        const player = document.querySelector('video')
        if (player) {
            player.addEventListener('ended', () => {
                handleProgress(player.currentTime);
            })
            player.addEventListener('timeupdate', function () {
                previousTime = currentTime;
                currentTime = player.currentTime;
            });
            player.addEventListener('seeking', function () {
                if (seekStart === null) {
                    seekStart = previousTime;
                }
            });
            player.addEventListener('seeked', function () {
                if (currentTime - seekStart > 60) {
                    player.pause()
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Learning too fast! Slow down!',
                        icon: 'warning',
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#57D9AC',
                    }).then(result => {
                        if (result.isConfirmed) {
                            player.play();
                        }
                    })
                    player.currentTime = seekStart;
                }
                seekStart = null;
            });
        }
    })


    const handleProgress = (timeStamp) => {
        // send api request to update progress
        // setProgress({ lesson_id: props.lesson_id, progress: timeStamp });
        // console.log('progress', progress);
    }

    return <video  className="plyr-react plyr" id='plyr' {...rest} />
})

export default CustomVideoPlyr
