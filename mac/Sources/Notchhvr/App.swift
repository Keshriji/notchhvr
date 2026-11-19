import AppKit
import SwiftUI

@main
struct NotchhvrApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var delegate
    @StateObject private var model = PlayerModel.shared

    var body: some Scene {
        MenuBarExtra("Notchhvr", systemImage: "record.circle.fill") {
            MenuContent(model: model)
        }
        .menuBarExtraStyle(.window)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var panel: IslandPanel?

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)

        let panel = IslandPanel(model: PlayerModel.shared)
        panel.orderFrontRegardless()
        self.panel = panel

        PlayerModel.shared.onLayoutChange = { [weak panel] expanded in
            panel?.sync(expanded: expanded)
        }
        PlayerModel.shared.onLayoutChange?(PlayerModel.shared.expanded)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}

/// A borderless panel that sits over the notch and never takes focus from your work.
final class IslandPanel: NSPanel {
    private let model: PlayerModel
    private let host: HostingView

    init(model: PlayerModel) {
        self.model = model
        self.host = HostingView(rootView: IslandView(model: model))
        super.init(
            contentRect: NSRect(x: 0, y: 0, width: 232, height: 40),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )

        isOpaque = false
        backgroundColor = .clear
        hasShadow = false
        level = .statusBar
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary, .ignoresCycle]
        hidesOnDeactivate = false
        isMovable = false
        ignoresMouseEvents = false
        contentView = host
        sync(expanded: false)
    }

    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { false }

    func sync(expanded: Bool) {
        guard let screen = NSScreen.main else { return }
        let width: CGFloat = expanded ? 392 : 244
        let height: CGFloat = expanded ? 196 : 40
        let frame = NSRect(
            x: screen.frame.midX - width / 2,
            y: screen.frame.maxY - height,
            width: width,
            height: height
        )
        NSAnimationContext.runAnimationGroup { context in
            context.duration = 0.28
            context.timingFunction = CAMediaTimingFunction(controlPoints: 0.16, 1, 0.3, 1)
            animator().setFrame(frame, display: true)
        }
    }
}

/// A hosting view that accepts the first click, so the island works while another app is in front.
final class HostingView: NSHostingView<IslandView> {
    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }
}

struct MenuContent: View {
    @ObservedObject var model: PlayerModel

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 10) {
                Artwork(art: model.track.art, size: 38, radius: 9)
                VStack(alignment: .leading, spacing: 1) {
                    Text(model.track.title).font(.system(size: 12, weight: .semibold))
                    Text(model.track.artist).font(.system(size: 10)).foregroundStyle(.secondary)
                }
                Spacer()
            }

            Divider()

            HStack(spacing: 16) {
                Button {
                    model.previous()
                } label: {
                    Image(systemName: "backward.fill")
                }
                Button {
                    model.toggle()
                } label: {
                    Image(systemName: model.playing ? "pause.fill" : "play.fill")
                }
                Button {
                    model.next()
                } label: {
                    Image(systemName: "forward.fill")
                }
                Spacer()
                Button {
                    model.expanded.toggle()
                } label: {
                    Image(systemName: "rectangle.topthird.inset.filled")
                }
            }
            .buttonStyle(.borderless)
            .font(.system(size: 13))

            Divider()

            Text("Hover the notch for the player. Click to keep it open.")
                .font(.system(size: 10))
                .foregroundStyle(.secondary)

            Button("Quit Notchhvr") {
                NSApp.terminate(nil)
            }
            .buttonStyle(.borderless)
            .font(.system(size: 11))
        }
        .padding(14)
        .frame(width: 260)
    }
}
