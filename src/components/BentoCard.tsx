import React from "react"

interface Props {
    src: string
    title: React.ReactNode
    description?: string
}

const BentoCard = ({ src, title, description }: Props) => {
    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top0 size-full object-cover object-center"
            />
            <div className="z-10 relative flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
export default BentoCard
