/*
Main package takes care of the search query in the application.
There are 3 type strucs: Searcher, Results, and DotIndices.

	1. Searcher: struct consist pf completeworks and suffixArray package that takes care of query
						lookup in bytes and string formats.
	2. Results: an object sent to frontend containig the results of the seach function.
	3. DotIndices: an object containig the indices of period (.) to period (.) before
							and after the found query in the sentence.

Usage:

Run ```go run main.go``` and open localhost:3001 in your browser to run development mode.
*/

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"index/suffixarray"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

// This functions runs the server, load the flat database(txt file), and handle http
// request for seach query.
func main() {
	searcher := Searcher{}
	err := searcher.Load("completeworks.txt")
	if err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	http.HandleFunc("/search", handleSearch(searcher))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	fmt.Printf("Listening on port %s...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

// Struct including completeworks string and suffixArray package for
// searching functionality.
type Searcher struct {
	CompleteWorks string
	SuffixArray   *suffixarray.Index
}

// Object result to send to front end (client side)
type Result struct {
	Text            string `json:"text"`
	OccurrenceCount int    `json:"occurrenceCount"`
	ErrorCode       int    `json:"errorCode"`
}

// Method of a Searcher type that returns a http request function.
func handleSearch(searcher Searcher) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		query, ok := r.URL.Query()["q"]
		if !ok || len(query[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing search query in URL params"))
			return
		}
		results := searcher.Search(query[0])
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		err := enc.Encode(results)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("encoding failure"))
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(buf.Bytes())
	}
}

// Loader function of the Searcher type that loads data in strings and bytes for search.
func (s *Searcher) Load(filename string) error {
	dat, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("Load: %w", err)
	}
	s.CompleteWorks = string(dat)
	//converting the data into lowercase to handle case-sensetivity.
	s.SuffixArray = suffixarray.New(bytes.ToLower(dat))
	return nil
}

// Searcher function of Searcher type that returns results.
func (s *Searcher) Search(query string) []Result {
	query = strings.ToLower(query)
	idxs := s.SuffixArray.Lookup([]byte(query), -1)
	results := []Result{}
	for _, idx := range idxs {
		text := s.CompleteWorks[idx-250 : idx+250]
		textToLower := strings.ToLower(text)
		// Add count value to handle sorting results on client side.
		count := strings.Count(textToLower, query)

		results = append(results, Result{Text: text, OccurrenceCount: count})
	}
	return results
}
