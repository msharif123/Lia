import { useState, useEffect, useRef } from 'react'
import './SearchBox.css'

const SearchBox = ({ links = [] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredLinks, setFilteredLinks] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const searchInputRef = useRef(null)
    const dropdownRef = useRef(null)
    const resultsListRef = useRef(null)

    // Scroll selected item into view
    const scrollToSelected = (index) => {
        if (resultsListRef.current && index >= 0) {
            const selectedElement = resultsListRef.current.children[index]

            if (selectedElement) {
                // Use scrollIntoView with 'nearest' to only scroll when needed
                selectedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                })
            }
        }
    }

    // Filter links based on search term
    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = links.filter(link =>
                link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                link.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredLinks(filtered)
            setIsDropdownOpen(filtered.length > 0)
            setSelectedIndex(-1)
        } else {
            setFilteredLinks([])
            setIsDropdownOpen(false)
            setSelectedIndex(-1)
        }
    }, [searchTerm, links])

    // Scroll to selected item when selectedIndex changes
    useEffect(() => {
        if (selectedIndex >= 0) {
            scrollToSelected(selectedIndex)
        }
    }, [selectedIndex])

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isDropdownOpen || filteredLinks.length === 0) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault() // Prevents page scroll
                setSelectedIndex(prevIndex =>
                    prevIndex < filteredLinks.length - 1 ? prevIndex + 1 : 0
                )
                break

            case 'ArrowUp':
                e.preventDefault() // Prevents page scroll
                setSelectedIndex(prevIndex =>
                    prevIndex > 0 ? prevIndex - 1 : filteredLinks.length - 1
                )
                break

            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0 && selectedIndex < filteredLinks.length) {
                    handleLinkClick(filteredLinks[selectedIndex])
                }
                break

            case 'Escape':
                setIsDropdownOpen(false)
                setSelectedIndex(-1)
                searchInputRef.current?.blur()
                break
        }
    }

    // Handle link selection
    const handleLinkClick = (link) => {
        if (link.href) {
            window.open(link.href, '_blank')
        } else if (link.onClick) {
            link.onClick()
        }
        setIsDropdownOpen(false)
        setSelectedIndex(-1)
        setSearchTerm('')
    }

    // Handle mouse hover on dropdown items
    const handleMouseEnter = (index) => {
        setSelectedIndex(index)
    }

    // Handle search input changes
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle input focus
    const handleInputFocus = () => {
        if (filteredLinks.length > 0 && searchTerm.length > 0) {
            setIsDropdownOpen(true)
        }
    }

    // Handle clicking outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
                setSelectedIndex(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="search-box" ref={dropdownRef}>
            <div className="search-input-container">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search help articles..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    className="search-input"
                    aria-label="Search help articles"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                    role="combobox"
                />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="m11.742 10.344 6.814 6.814a1 1 0 1 1-1.414 1.414l-6.814-6.814a8 8 0 1 1 1.414-1.414Z" fill="currentColor" />
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {isDropdownOpen && (
                <div className="search-dropdown" role="listbox">
                    <ul className="search-results" ref={resultsListRef}>
                        {filteredLinks.map((link, index) => (
                            <li
                                key={link.id}
                                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleLinkClick(link)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                role="option"
                                aria-selected={index === selectedIndex}
                            >
                                <div className="result-title">{link.title}</div>
                                {link.description && (
                                    <div className="result-description">{link.description}</div>
                                )}
                                {link.category && (
                                    <div className="result-category">{link.category}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchBox