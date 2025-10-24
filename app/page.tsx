'use client'

import { useState } from 'react'

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }

  const m = nums1.length
  const n = nums2.length
  let low = 0
  let high = m

  while (low <= high) {
    const partition1 = Math.floor((low + high) / 2)
    const partition2 = Math.floor((m + n + 1) / 2) - partition1

    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1]
    const minRight1 = partition1 === m ? Infinity : nums1[partition1]

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1]
    const minRight2 = partition2 === n ? Infinity : nums2[partition2]

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // Found the correct partition
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
      } else {
        return Math.max(maxLeft1, maxLeft2)
      }
    } else if (maxLeft1 > minRight2) {
      high = partition1 - 1
    } else {
      low = partition1 + 1
    }
  }

  throw new Error('Input arrays are not sorted')
}

export default function Home() {
  const [nums1Input, setNums1Input] = useState('[1,3]')
  const [nums2Input, setNums2Input] = useState('[2]')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [steps, setSteps] = useState<string[]>([])

  const calculateMedian = () => {
    try {
      setError(null)
      const nums1 = JSON.parse(nums1Input) as number[]
      const nums2 = JSON.parse(nums2Input) as number[]

      // Validate inputs
      if (!Array.isArray(nums1) || !Array.isArray(nums2)) {
        throw new Error('Both inputs must be arrays')
      }

      if (nums1.length === 0 && nums2.length === 0) {
        throw new Error('At least one array must be non-empty')
      }

      // Check if arrays are sorted
      for (let i = 1; i < nums1.length; i++) {
        if (nums1[i] < nums1[i - 1]) {
          throw new Error('nums1 is not sorted')
        }
      }
      for (let i = 1; i < nums2.length; i++) {
        if (nums2[i] < nums2[i - 1]) {
          throw new Error('nums2 is not sorted')
        }
      }

      const median = findMedianSortedArrays(nums1, nums2)
      setResult(median)

      // Generate explanation steps
      const merged = [...nums1, ...nums2].sort((a, b) => a - b)
      const totalLength = nums1.length + nums2.length
      const stepsList = [
        `Input: nums1 = ${JSON.stringify(nums1)}, nums2 = ${JSON.stringify(nums2)}`,
        `Total length: ${totalLength}`,
        `Merged array (for visualization): ${JSON.stringify(merged)}`,
        totalLength % 2 === 1
          ? `Median is at position ${Math.floor(totalLength / 2)}: ${median}`
          : `Median is average of positions ${totalLength / 2 - 1} and ${totalLength / 2}: ${median}`,
        `Time complexity: O(log(min(m,n)))`,
      ]
      setSteps(stepsList)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input')
      setResult(null)
      setSteps([])
    }
  }

  const examples = [
    { nums1: '[1,3]', nums2: '[2]', description: 'Example 1' },
    { nums1: '[1,2]', nums2: '[3,4]', description: 'Example 2' },
    { nums1: '[]', nums2: '[1]', description: 'Single element' },
    { nums1: '[1,2,3,4,5]', nums2: '[6,7,8,9,10]', description: 'Larger arrays' },
  ]

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#1a202c',
          textAlign: 'center',
        }}>
          Median of Two Sorted Arrays
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#718096',
          marginBottom: '2rem',
          fontSize: '0.9rem',
        }}>
          O(log(min(m,n))) time complexity using binary search
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2d3748',
          }}>
            Array 1 (nums1):
          </label>
          <input
            type="text"
            value={nums1Input}
            onChange={(e) => setNums1Input(e.target.value)}
            placeholder="[1,3]"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'monospace',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2d3748',
          }}>
            Array 2 (nums2):
          </label>
          <input
            type="text"
            value={nums2Input}
            onChange={(e) => setNums2Input(e.target.value)}
            placeholder="[2]"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'monospace',
            }}
          />
        </div>

        <button
          onClick={calculateMedian}
          style={{
            width: '100%',
            padding: '0.875rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Calculate Median
        </button>

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fed7d7',
            border: '1px solid #fc8181',
            borderRadius: '8px',
            color: '#c53030',
            marginBottom: '1.5rem',
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {result !== null && (
          <div style={{
            padding: '1.5rem',
            background: '#c6f6d5',
            border: '2px solid #48bb78',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#22543d',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              Median: {result.toFixed(5)}
            </div>

            {steps.length > 0 && (
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '6px',
                marginTop: '1rem',
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#2d3748',
                }}>
                  Explanation:
                </h3>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.5rem 0',
                      color: '#4a5568',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                    }}
                  >
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e2e8f0',
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#2d3748',
          }}>
            Example Inputs:
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
          }}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setNums1Input(example.nums1)
                  setNums2Input(example.nums2)
                }}
                style={{
                  padding: '0.75rem',
                  background: '#f7fafc',
                  border: '1px solid #cbd5e0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#edf2f7'
                  e.currentTarget.style.borderColor = '#a0aec0'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#f7fafc'
                  e.currentTarget.style.borderColor = '#cbd5e0'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#2d3748' }}>
                  {example.description}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#718096', fontFamily: 'monospace' }}>
                  {example.nums1}, {example.nums2}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#edf2f7',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: '#4a5568',
        }}>
          <strong>Algorithm:</strong> Uses binary search on the smaller array to find the correct partition point.
          Maintains O(log(min(m,n))) time complexity and O(1) space complexity.
        </div>
      </div>
    </main>
  )
}
