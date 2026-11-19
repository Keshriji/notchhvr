import AppKit
import Combine
import SwiftUI

struct Art: Equatable {
    let from: String
    let to: String
    let accent: String
}

struct Track: Equatable {
    let title: String
    let artist: String
    let album: String
    let duration: Double
    let art: Art
}

extension Color {
    init(hex: String) {
        let value = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var number: UInt64 = 0
        Scanner(string: value).scanHexInt64(&number)
        let r = Double((number >> 16) & 0xFF) / 255
        let g = Double((number >> 8) & 0xFF) / 255
        let b = Double(number & 0xFF) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: 1)
    }
}

/// Simulated now-playing state.
///
/// The shipping app reads the system Now Playing session and drives Spotify or Apple Music.
/// That needs MediaRemote / Apple Events entitlements and a signed bundle, so this scaffold
/// keeps a small local queue and a timer instead. Everything the island draws is real state.
@MainActor
final class PlayerModel: ObservableObject {
    static let shared = PlayerModel()

    static let queue: [Track] = [
        Track(
            title: "Golden Hour",
            artist: "Nova Lane",
            album: "Slow Light",
            duration: 214,
            art: Art(from: "#f4b869", to: "#b4462c", accent: "#ffe2b8")
        ),
        Track(
            title: "Slow Static",
            artist: "Juniper Vale",
            album: "Paper Moons",
            duration: 198,
            art: Art(from: "#8f7ad6", to: "#2a1c4d", accent: "#ffb7d5")
        ),
        Track(
            title: "Night Mail",
            artist: "The Lantern Club",
            album: "Postcards",
            duration: 242,
            art: Art(from: "#5ec2c6", to: "#123c4a", accent: "#c8fbff")
        )
    ]

    @Published private(set) var index = 0
    @Published private(set) var playing = false
    @Published private(set) var progress: Double = 72
    @Published var expanded = false {
        didSet { onLayoutChange?(expanded) }
    }

    var onLayoutChange: ((Bool) -> Void)?

    let ticker = Timer.publish(every: 0.25, on: .main, in: .common).autoconnect()
    private var collapseWorkItem: DispatchWorkItem?
    private var pinned = false

    var track: Track { Self.queue[index] }

    var remaining: String {
        let left = max(0, track.duration - progress)
        return "-\(Int(left) / 60):" + String(format: "%02d", Int(left) % 60)
    }

    var elapsed: String {
        "\(Int(progress) / 60):" + String(format: "%02d", Int(progress) % 60)
    }

    var fraction: Double {
        min(1, max(0, progress / track.duration))
    }

    func tick() {
        guard playing else { return }
        progress += 0.25
        if progress >= track.duration {
            next()
        }
    }

    func toggle() {
        playing.toggle()
    }

    func next() {
        index = (index + 1) % Self.queue.count
        progress = 0
    }

    func previous() {
        index = (index - 1 + Self.queue.count) % Self.queue.count
        progress = 0
    }

    func togglePinned() {
        pinned.toggle()
        expanded = pinned || expanded
    }

    func hover(_ inside: Bool) {
        collapseWorkItem?.cancel()
        if inside {
            expanded = true
            return
        }
        guard !pinned else { return }
        let work = DispatchWorkItem { [weak self] in
            guard let self, !self.pinned else { return }
            self.expanded = false
        }
        collapseWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35, execute: work)
    }
}

struct Artwork: View {
    let art: Art
    var size: CGFloat = 26
    var radius: CGFloat = 6

    var body: some View {
        RoundedRectangle(cornerRadius: radius, style: .continuous)
            .fill(
                LinearGradient(
                    colors: [Color(hex: art.from), Color(hex: art.to)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .overlay(
                Circle()
                    .fill(Color(hex: art.accent).opacity(0.55))
                    .frame(width: size * 0.42, height: size * 0.42)
                    .blur(radius: size * 0.06)
                    .offset(x: size * 0.12, y: -size * 0.1)
            )
            .overlay(
                RoundedRectangle(cornerRadius: radius, style: .continuous)
                    .strokeBorder(.white.opacity(0.16), lineWidth: 0.5)
            )
            .frame(width: size, height: size)
    }
}

struct Equalizer: View {
    var active: Bool
    @State private var phase: CGFloat = 0

    var body: some View {
        HStack(alignment: .bottom, spacing: 2) {
            ForEach(0..<4, id: \.self) { bar in
                Capsule()
                    .fill(Color(hex: "#7ef0b2"))
                    .frame(width: 2, height: active ? 4 + CGFloat((bar * 3 + Int(phase * 6)) % 10) : 3)
            }
        }
        .frame(height: 14, alignment: .bottom)
        .animation(.easeInOut(duration: 0.24), value: phase)
    }
}
