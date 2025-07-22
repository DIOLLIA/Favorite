package games

import (
	"testing"
)

func BenchmarkDataCreate(b *testing.B) {
	for i := 0; i < b.N; i++ {
		initGameData()
	}
}

func BenchmarkDataCreate2(b *testing.B) {
	for i := 0; i < b.N; i++ {
		initGameData2()
	}
}

func BenchmarkDataCreate3(b *testing.B) {
	for i := 0; i < b.N; i++ {
		initGameData3()
	}
}
