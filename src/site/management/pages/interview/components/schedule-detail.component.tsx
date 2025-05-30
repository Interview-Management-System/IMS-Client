function ScheduleDetailComponent({ calendarEvent }: any) {
    return (
        <>
            <div className='sx__event-modal-default'>
                <div className='sx__has-icon sx__event-modal__title'>
                    <div
                        className='sx__event-modal__color-icon sx__event-icon'
                        style={{ backgroundColor: 'var(--sx-color-primary-container)' }}
                    ></div>
                    {calendarEvent.title}
                </div>

                <div className='sx__has-icon sx__event-modal__time'>
                    <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='sx__event-icon'
                    >
                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            <path
                                d='M12 8V12L15 15'
                                stroke='var(--sx-internal-color-text)'
                                stroke-width='2'
                                stroke-linecap='round'
                            ></path>
                            <circle
                                cx='12'
                                cy='12'
                                r='9'
                                stroke='var(--sx-internal-color-text)'
                                stroke-width='2'
                            ></circle>
                        </g>
                    </svg>
                    <div>
                        May 27, 2025 <span aria-hidden='true'>⋅</span> 3:00 AM – 4:00 AM
                    </div>
                </div>

                <div className='sx__has-icon sx__event-modal__location'>
                    <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='sx__event-icon'
                    >
                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            <g clip-path='url(#clip0_429_11046)'>
                                <rect
                                    x='12'
                                    y='11'
                                    width='0.01'
                                    height='0.01'
                                    stroke='var(--sx-internal-color-text)'
                                    stroke-width='2'
                                    stroke-linejoin='round'
                                ></rect>
                                <path
                                    d='M12 22L17.5 16.5C20.5376 13.4624 20.5376 8.53757 17.5 5.5C14.4624 2.46244 9.53757 2.46244 6.5 5.5C3.46244 8.53757 3.46244 13.4624 6.5 16.5L12 22Z'
                                    stroke='var(--sx-internal-color-text)'
                                    stroke-width='2'
                                    stroke-linejoin='round'
                                ></path>
                            </g>
                            <defs>
                                <clipPath id='clip0_429_11046'>
                                    <rect width='24' height='24' fill='white'></rect>
                                </clipPath>
                            </defs>
                        </g>
                    </svg>
                    Conferenceasdfasdf
                </div>

                <div className='sx__has-icon sx__event-modal__description'>
                    <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='sx__event-icon'
                    >
                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            <rect
                                x='4'
                                y='4'
                                width='16'
                                height='16'
                                rx='3'
                                stroke='var(--sx-internal-color-text)'
                                stroke-width='2'
                            ></rect>
                            <path
                                d='M16 10L8 10'
                                stroke='var(--sx-internal-color-text)'
                                stroke-width='2'
                                stroke-linecap='round'
                            ></path>
                            <path
                                d='M16 14L8 14'
                                stroke='var(--sx-internal-color-text)'
                                stroke-width='2'
                                stroke-linecap='round'
                            ></path>
                        </g>
                    </svg>
                    Discuss pasdfasdfs
                </div>
            </div>
        </>
    )
}

export default ScheduleDetailComponent
