export default function OpenAILogo(props: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div aria-label="OpenAI" className="flex flex-row justify-start items-center fill-white" {...props}>
            <svg className="mr-1.5 h-7 w-7 md:h-8 md:w-8" fill="currentColor" fillRule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path></svg>
            <svg className="h-7 md:h-8" fill="currentColor" fillRule="evenodd" viewBox="0 0 84 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.955c0 5.276 3.376 8.955 8.054 8.955 4.678 0 8.054-3.679 8.054-8.955S14.732 2 10.054 2C5.423 2 2.068 5.606 2 10.797L2 10.955zm13.021 0c0 3.775-2.05 6.22-4.967 6.22-2.918 0-4.968-2.445-4.968-6.22 0-3.776 2.05-6.22 4.968-6.22 2.917 0 4.967 2.444 4.967 6.22zm11.778 8.955c3.545 0 5.57-3.001 5.57-6.607 0-3.607-2.025-6.608-5.57-6.608-1.64 0-2.845.654-3.64 1.598V6.937h-2.894V24h2.893v-5.688c.796.944 2.002 1.598 3.641 1.598zm-3.713-6.97c0-2.397 1.35-3.703 3.135-3.703 2.097 0 3.23 1.645 3.23 4.066 0 2.42-1.133 4.066-3.23 4.066-1.785 0-3.135-1.332-3.135-3.68v-.75zM40.2 19.91c2.532 0 4.533-1.331 5.425-3.558l-2.483-.944c-.386 1.307-1.52 2.033-2.942 2.033-1.857 0-3.159-1.331-3.376-3.51h8.874v-.967c0-3.485-1.953-6.269-5.619-6.269-3.665 0-6.028 2.88-6.028 6.608 0 3.92 2.532 6.607 6.15 6.607zm-.145-10.77c1.833 0 2.701 1.21 2.725 2.614H36.97c.434-1.719 1.591-2.614 3.086-2.614zm7.814 10.504h2.894v-7.455c0-1.815 1.326-2.783 2.628-2.783 1.591 0 2.218 1.137 2.218 2.71v7.528h2.894V11.27c0-2.735-1.592-4.575-4.244-4.575-1.64 0-2.773.75-3.496 1.598V6.937h-2.894v12.707zM66.978 2.266l-6.56 17.378h3.063l1.471-3.97h7.475l1.495 3.97h3.11L70.475 2.266h-3.496zm1.687 3.437l2.75 7.26h-5.45l2.7-7.26zM82 2.317h-3.086v17.377H82V2.317z"></path></svg>
        </div>
    )
}