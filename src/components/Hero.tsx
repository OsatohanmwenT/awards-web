import {useEffect, useRef, useState} from "react";
import Button from "./Button.tsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const headings: { [key: number]: string } = {
    1: "G<b>a</b>ming",
    2: "Ide<b>n</b>tity",
    3: "Re<b>a</b>lity",
    4: "Lif<b>e</b>style",
};

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadedVideos, setLoadedVideos] = useState<number>(0);

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement | null>(null);

    const playVideo = () => {
        nextVideoRef.current?.play();
    };

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1


    const handleMiniVdClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    useEffect(() => {
        if(loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    useGSAP(() => {
        if(hasClicked) {
            gsap.set("#next-video", {visibility: "visible"});

            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.out",
                onStart: playVideo,
            });

            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            })
        }
    },{dependencies: [currentIndex], revertOnUpdate: true})

    useGSAP(() => {
        const timeline = gsap.timeline();

        // Animate the old text out
        timeline
            .to("#current-text", {

                opacity: 0,
                rotateX: -20,
                rotateY: 60,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power1.in",
            })
            // Update the text content
            .set("#current-text", {
                innerHTML: headings[currentIndex],
            })

            .fromTo(
                "#current-text",
                {
                    opacity: 0,
                    rotateX: 20,
                    rotateY: -60, // Start from the opposite side
                    transformPerspective: 1000,
                },
                {
                    opacity: 1,
                    rotateX: 0,
                    rotateY: 0, // Reset to original position
                    duration: 0.5,
                    ease: "power1.out",
                }
            );
    }, { dependencies: [currentIndex] });

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: "0 0 40% 10%",
        })

        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            }
        })
    })

    const getVideoSrc = (index: number) => {
        return `videos/hero-${index}.mp4`;
    }
    
    return (
        <section className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div
                        className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick}
                             className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-center object-cover"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        loop
                        autoPlay
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>
                <h1
                    id="current-text"
                    className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
                    dangerouslySetInnerHTML={{__html: headings[currentIndex]}}
                ></h1>

                <div className="absolute top-0 left-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame
                            Layer <br/> Unleash the Play Economy.</p>
                        <Button id="watch-trailer" title="Watch Trailer"
                                containerClass="!bg-yellow-300 flex-center hover:gap-3 transition-all duration-500 gap-1" leftIcon={<TiLocationArrow/>}/>
                    </div>
                </div>
            </div>
            <h1
                className="special-font hero-heading absolute bottom-5 right-5 text-black"
                dangerouslySetInnerHTML={{__html: headings[currentIndex]}}
            ></h1>
        </section>
    )
}
export default Hero
