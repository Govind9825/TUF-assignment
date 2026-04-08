import { useState, useEffect, useCallback } from "react";
import { CalendarNote, getNotesKey, loadNotes, saveNotes } from "@/lib/calendarUtils";
import { Trash2 } from "lucide-react";

interface NotesPanelProps {
  month: number;
  year: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

const NotesPanel = ({ month, year, rangeStart, rangeEnd }: NotesPanelProps) => {
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [text, setText] = useState("");

  const currentKey = getNotesKey(year, month, rangeStart, rangeEnd);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const filteredNotes = notes.filter((n) => n.monthKey === currentKey);

  const addNote = useCallback(() => {
    if (!text.trim()) return;
    const newNote: CalendarNote = {
      id: crypto.randomUUID(),
      text: text.trim(),
      monthKey: currentKey,
      createdAt: Date.now(),
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    saveNotes(updated);
    setText("");
  }, [text, notes, currentKey]);

  const deleteNote = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      saveNotes(updated);
    },
    [notes]
  );

  return (
    <div className="flex flex-col h-full">
      <p className="text-[11px] font-heading font-bold tracking-wider text-muted-foreground uppercase mb-3">
        Notes
      </p>

      <div className="flex-1 space-y-1 overflow-y-auto min-h-0 mb-2">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-1.5 group animate-fade-in"
          >
            <span className="text-xs text-muted-foreground mt-0.5">•</span>
            <p className="text-xs text-foreground flex-1 leading-relaxed">{note.text}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="p-0.5 opacity-0 group-hover:opacity-100 calendar-transition"
            >
              <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[60px]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note and press Enter…"
          className="w-full h-full resize-none bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none leading-[22px]"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 21px, hsl(220 15% 88%) 21px, hsl(220 15% 88%) 22px)",
            backgroundSize: "100% 22px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addNote();
            }
          }}
        />
      </div>
    </div>
  );
};

export default NotesPanel;
