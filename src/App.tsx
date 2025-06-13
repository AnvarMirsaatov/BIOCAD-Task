import { useForm } from 'react-hook-form'
import { Box, Button, Snackbar, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Visualizer } from './Visualizer'

type FormValues = {
  seq1: string
  seq2: string
}

type ResultType = {
  a: string
  b: string
}

const AMINO_REGEX = /^[ARNDCQEGHILKMFPSTWYV-]+$/i

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [result, setResult] = useState<ResultType | null>(null)
  const [copied, setCopied] = useState(false)

  const onSubmit = (data: FormValues) => {
    if (data.seq1.length !== data.seq2.length) {
      alert('Sequences must be the same length')
      return
    }
    setResult({
      a: data.seq1.toUpperCase(),
      b: data.seq2.toUpperCase(),
    })
  }

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString()
      if (selection && selection.length > 1) {
        navigator.clipboard.writeText(selection)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <Box p={2} maxWidth={600} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Sequence 1"
          fullWidth
          {...register('seq1', {
            required: 'This field is required',
            pattern: {
              value: AMINO_REGEX,
              message:
                'Only A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V and - are allowed',
            },
          })}
          error={!!errors.seq1}
          helperText={errors.seq1?.message}
          margin="normal"
        />

        <TextField
          label="Sequence 2"
          fullWidth
          {...register('seq2', {
            required: 'This field is required',
            pattern: {
              value: AMINO_REGEX,
              message:
                'Only A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V and - are allowed',
            },
          })}
          error={!!errors.seq2}
          helperText={errors.seq2?.message}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth>
          Show
        </Button>
      </form>

      {result && (
        <Box mt={4} fontSize={'20px'} color={'#000'}>
          <Visualizer seq1={result.a} seq2={result.b} />
        </Box>
      )}

      <Snackbar
        open={copied}
        message="Copied successfully!"
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

export default App
