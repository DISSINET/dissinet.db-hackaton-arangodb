### Graph approach
1: all P that are direct in S type 'transfer'
FOR s in statements
    FILTER s.type == 'transfer'
    FOR v, e, t IN ANY s edges
        FILTER e.type == 'subject'
        RETURN v
        
2: All transfers being part of another event
FOR s in statements
    FILTER s.type == 'being-part'
    FOR v, e, t IN ANY s edges
        FILTER v.type == 'trasnfer'
        RETURN v

### Relations approach
1: all P that are direct in S type 'transfer'
FOR s IN statements
  FOR p IN persons
    FILTER s.direct == p.id
    FILTER s.type == 'transfer'
    RETURN p.name 
returns [
  "The group of Heretics2",
  "Karolina66",
  "The group of Heretics49",
  "Mayor of the town31",
  "Karolina78",
  "Tomáš96",
  "Alica26",
  "The group of Heretics97",
  "Tomáš46",
  "The group of Heretics85"
]

2: all E that consist of S type 'transfer'
FOR s IN statements
    FOR s2 IN statements
        FOR e IN events
            FILTER s.type == 'being-part'
            FILTER s.direct == e.id
            FILTER s.subject == s2.id
            FILTER s2.type == 'transfer'
                RETURN e.name
returns []

3: all P and their L
FOR s IN statements
  FOR p IN persons
    FOR l IN locations
        FILTER s.type == 'location'
        FILTER s.subject == p.id
        FILTER s.direct == l.id
        RETURN {location: l.name, person: p.name}
        
returns [
  {
    "location": "a dark village at the end of the road15",
    "person": "Tomáš15"
  },
  {
    "location": "a dark village at the end of the road15",
    "person": "Mayor of the town14"
  },
  {
    "location": "Plzeň12",
    "person": "Karol74"
  },
  {
    "location": "Berlin18",
    "person": "The group of Heretics85"
  },
  {
    "location": "Vienna4",
    "person": "Adam32"
  },
  {
    "location": "Bratislava9",
    "person": "Alica89"
  },
  {
    "location": "a dark village at the end of the road5",
    "person": "Tomáš22"
  },
  {
    "location": "Berlin2",
    "person": "Karolina79"
  },
  {
    "location": "Plzeň12",
    "person": "Karolina45"
  },
  {
    "location": "Apple town3",
    "person": "David64"
  },
  {
    "location": "Apple town0",
    "person": "Tomáš63"
  }
]
