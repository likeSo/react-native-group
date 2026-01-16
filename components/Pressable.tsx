import { Stack, styled } from "tamagui";

const Pressable = styled(Stack, {
    cursor: 'pointer',
    hoverStyle: {
        background: '$backgroundHover',
    },
    pressStyle: {
        background: '$backgroundPress',
    }
})

export default Pressable;