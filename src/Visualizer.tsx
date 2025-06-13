import { Box } from '@mui/material'

const COLOR_MAP: Record<string, string> = {
    A: "#f4cccc", R: "#cfe2f3", N: "#d9ead3", D: "#f9cb9c",
    C: "#ead1dc", Q: "#d0e0e3", E: "#ffe599", G: "#c9daf8",
    H: "#b6d7a8", I: "#fce5cd", L: "#d9d2e9", K: "#cfe2f3",
    M: "#ead1dc", F: "#f4cccc", P: "#d9ead3", S: "#f9cb9c",
    T: "#fff2cc", W: "#c9daf8", Y: "#b6d7a8", V: "#fce5cd",
    "-": "#eeeeee"
}

export const Visualizer = ({ seq1, seq2 }: { seq1: string, seq2: string }) => {
    const chunked1 = seq1.match(/.{1,30}/g) || []
    const chunked2 = seq2.match(/.{1,30}/g) || []

    return (
        <Box fontFamily="monospace" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {chunked1.map((line1, i) => {
                const line2 = chunked2[i]
                return (
                    <Box key={i} mb={2}>
                        <Box>
                            {line1.split('').map((char, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        backgroundColor: COLOR_MAP[char] || "#fff",
                                        padding: '2px 4px'
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </Box>
                        <Box>
                            {line2.split('').map((char, idx) => {
                                const diff = char !== line1[idx]
                                return (
                                    <span
                                        key={idx}
                                        style={{
                                            backgroundColor: diff ? "#ffe6e6" : "transparent",
                                            padding: '2px 4px'
                                        }}
                                    >
                                        {char}
                                    </span>
                                )
                            })}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}
